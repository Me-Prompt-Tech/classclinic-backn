import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // 1. Total patients registered today
    const totalPatientsToday = await prisma.patient.count({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    // 2. Active appointments (overall PENDING or CONFIRMED status)
    const activeAppointments = await prisma.appointment.count({
      where: {
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    // 3. Daily revenue (sum of medical record prices created today)
    const revenueAggregate = await prisma.medicalRecord.aggregate({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      _sum: {
        price: true,
      },
    });

    const dailyRevenue = revenueAggregate._sum.price || 0;

    return NextResponse.json({
      totalPatientsToday,
      activeAppointments,
      dailyRevenue,
    });
  } catch (error) {
    console.error('Fetch dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
