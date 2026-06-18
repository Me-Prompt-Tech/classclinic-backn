import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AppointmentStatus } from '@prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Validate if the status is a valid AppointmentStatus enum value
    const validStatuses = Object.values(AppointmentStatus);
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Check if the appointment exists
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Update the appointment status
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status: status as AppointmentStatus },
      include: {
        patient: true,
      },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
