import doctorAvatar from '../assets/avatars/doctor.png'
import lawyerAvatar from '../assets/avatars/lawyer.png'
import nurseAvatar from '../assets/avatars/nurse.png'
import plumberAvatar from '../assets/avatars/plumber.png'
import policeOfficerAvatar from '../assets/avatars/police-officer.png'
import scientistAvatar from '../assets/avatars/scientist.png'
import softwareDeveloperAvatar from '../assets/avatars/software-developer.png'
import teacherAvatar from '../assets/avatars/teacher.png'

export type Career = {
  id: string
  name: string
  avatar: string
  annualSalary: number
  /** Where the annualSalary figure came from, for transparency to players/parents/teachers. */
  source: string
}

/**
 * Real UK salary figures from published, trusted sources (see each `source` field).
 * Figures current as of the 2025/26 pay year. Do not replace with invented numbers.
 */
export const careers: Career[] = [
  {
    id: 'teacher',
    name: 'Teacher',
    avatar: teacherAvatar,
    annualSalary: 31650,
    source:
      'Get Into Teaching, Department for Education (2025/26 main pay scale, outside London) - getintoteaching.education.gov.uk',
  },
  {
    id: 'nurse',
    name: 'Nurse',
    avatar: nurseAvatar,
    annualSalary: 31049,
    source:
      'NHS Employers, Agenda for Change Band 5 starting salary (entry point, from 1 April 2025) - nhsemployers.org/articles/pay-scales-2025-26',
  },
  {
    id: 'doctor',
    name: 'Doctor',
    avatar: doctorAvatar,
    annualSalary: 38831,
    source:
      'NHS Health Careers, newly qualified Foundation Year 1 doctor pay (from 1 April 2025) - healthcareers.nhs.uk',
  },
  {
    id: 'police-officer',
    name: 'Police Officer',
    avatar: policeOfficerAvatar,
    annualSalary: 31164,
    source:
      'Police Remuneration Review Body 2025 report, starting constable pay point (from 1 September 2025) - gov.uk',
  },
  {
    id: 'plumber',
    name: 'Plumber',
    avatar: plumberAvatar,
    annualSalary: 24000,
    source: 'National Careers Service, starter salary - nationalcareers.service.gov.uk/job-profiles/plumber',
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    avatar: lawyerAvatar,
    annualSalary: 30000,
    source: 'National Careers Service, starter salary for a solicitor - nationalcareers.service.gov.uk/job-profiles/solicitor',
  },
  {
    id: 'scientist',
    name: 'Scientist',
    avatar: scientistAvatar,
    annualSalary: 27000,
    source:
      'National Careers Service, starter salary for a research scientist - nationalcareers.service.gov.uk/job-profiles/research-scientist',
  },
  {
    id: 'software-developer',
    name: 'Software Developer',
    avatar: softwareDeveloperAvatar,
    annualSalary: 30000,
    source:
      'National Careers Service, starter salary - nationalcareers.service.gov.uk/job-profiles/software-developer',
  },
]
