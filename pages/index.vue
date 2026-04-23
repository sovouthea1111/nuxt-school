<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-medium tracking-tight text-gray-900">
          Overview
        </h1>
        <p class="text-sm text-gray-500 mt-1">Academic Year 2023-2024</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <Printer class="w-4 h-4" :stroke-width="1.5" />
          Reports
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <PlusCircle class="w-4 h-4" :stroke-width="1.5" />
          New Admission
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard v-for="stat in stats" :key="stat.label" v-bind="stat" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <TodaySchedule :schedule="schedule" />
      </div>
      <RecentActivity :activities="activities" />
    </div>
  </div>
</template>

<script setup>
import {
  Printer,
  PlusCircle,
  Users,
  HandMetal,
  BookMarked,
  BarChart2,
  FilePlus,
  UserCheck,
  CalendarPlus,
} from "lucide-vue-next";
import StatCard from "~/components/dashboard/StatCard.vue";
import TodaySchedule from "~/components/dashboard/TodaySchedule.vue";
import RecentActivity from "~/components/dashboard/RecentActivity.vue";

const stats = [
  {
    label: "Total Students",
    value: "2,845",
    change: "4.2%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Teachers",
    value: "142",
    change: "0.0%",
    trend: "flat",
    icon: HandMetal,
  },
  {
    label: "Active Classes",
    value: "86",
    change: "2.1%",
    trend: "up",
    icon: BookMarked,
  },
  {
    label: "Avg. Attendance",
    value: "94.8%",
    change: "0.3%",
    trend: "down",
    icon: BarChart2,
  },
];

const schedule = [
  {
    time: "08:00 - 09:30",
    class: "Grade 10-A",
    subject: "Advanced Mathematics",
    room: "Lab 302",
    status: "Completed",
  },
  {
    time: "09:45 - 11:15",
    class: "Grade 11-B",
    subject: "Physics",
    room: "Room 104",
    status: "In Progress",
  },
  {
    time: "11:30 - 13:00",
    class: "Grade 9-C",
    subject: "World History",
    room: "Room 201",
    status: "Upcoming",
  },
  {
    time: "14:00 - 15:30",
    class: "Grade 12-A",
    subject: "Computer Science",
    room: "Lab 405",
    status: "Upcoming",
  },
];

const activities = [
  {
    icon: FilePlus,
    title: "Term 1 Results Published",
    description: "Grades for all senior classes have been updated.",
    time: "10 minutes ago",
  },
  {
    icon: UserCheck,
    title: "New Student Enrollment",
    description: "Sarah Jenkins enrolled in Grade 10-A.",
    time: "2 hours ago",
  },
  {
    icon: CalendarPlus,
    title: "Staff Meeting Scheduled",
    description: "Monthly academic review set for Friday.",
    time: "Yesterday",
  },
];
</script>
