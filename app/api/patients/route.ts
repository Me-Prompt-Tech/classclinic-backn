import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all patients
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error('Fetch patients error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new patient with automated HN logic
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      phone,
      birthDate,
      gender,
      congenitalDisease,
      allergicDrugs,
    } = body;

    // Validation
    if (!firstName || !lastName || !phone || !birthDate || !gender) {
      return NextResponse.json(
        { error: 'firstName, lastName, phone, birthDate, and gender are required' },
        { status: 400 }
      );
    }

    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid birthDate format. Please use YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    // Automated HN Generation logic: HN-YYYYMMDD-XXXX
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const datePrefix = `HN-${yyyy}${mm}${dd}-`;

    // Query for the highest sequence number created today
    const lastPatientToday = await prisma.patient.findFirst({
      where: {
        hn: {
          startsWith: datePrefix,
        },
      },
      orderBy: {
        hn: 'desc',
      },
    });

    let nextSequence = 1;
    if (lastPatientToday) {
      const parts = lastPatientToday.hn.split('-');
      if (parts.length === 3) {
        const lastSeq = parseInt(parts[2], 10);
        if (!isNaN(lastSeq)) {
          nextSequence = lastSeq + 1;
        }
      }
    }

    const generatedHn = `${datePrefix}${String(nextSequence).padStart(4, '0')}`;

    // Create the patient
    const newPatient = await prisma.patient.create({
      data: {
        hn: generatedHn,
        firstName,
        lastName,
        phone,
        birthDate: parsedBirthDate,
        gender,
        congenitalDisease: congenitalDisease || null,
        allergicDrugs: allergicDrugs || null,
      },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Create patient error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
