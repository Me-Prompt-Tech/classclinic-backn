import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all appointments with patient relation
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
      },
      orderBy: {
        appointmentDate: 'asc',
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Fetch appointments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new appointment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, appointmentDate, doctorName, notes } = body;

    // Validation
    if (!patientId || !appointmentDate || !doctorName) {
      return NextResponse.json(
        { error: 'patientId, appointmentDate, and doctorName are required' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid appointmentDate format. Please use a valid ISO date string.' },
        { status: 400 }
      );
    }

    // Verify patient exists
    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patientExists) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Create the appointment
    const newAppointment = await prisma.appointment.create({
      data: {
        patientId,
        appointmentDate: parsedDate,
        doctorName,
        notes: notes || null,
        status: 'PENDING',
      },
      include: {
        patient: true,
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error('Create appointment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
