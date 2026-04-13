import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  period: string;
}

interface Skill {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  @ViewChild('blackboardContent') blackboardContent: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('stickmanSvg') stickmanSvg: ElementRef<SVGElement> | undefined;

  scrollProgress = 0;
  teacherAnimation = 'teaching-idle';
  
  // Arm tracking
  mouseX = 0;
  mouseY = 0;
  armX2 = 20;
  armY2 = 30;
  handX = 20;
  handY = 30;
  
  // Stickman position constants
  stickmanX = 50;
  stickmanY = 48;
  armLength = 35;
  handRadius = 4;

  name = 'Sanskar Sengar';
  title = 'Full Stack .NET & Angular Developer';
  contact = {
    phone: '+91 62634 43577',
    email: 'sanskarnewsengar@gmail.com',
    linkedin: 'linkedin.com/in/sanskar-sengar',
    github: 'github.com/sanskar18s'
  };

  summary = 'Dedicated Full-stack .NET and Angular Developer with 1+ year of professional experience building scalable enterprise applications and secure RESTful APIs. Proven track record of delivering high-impact features for 90,000+ users, optimizing SQL performance, and contributing to Agile teams.';
  
  education = {
    school: 'LNCT University, Bhopal',
    period: '2020–2024',
    cgpa: 'CGPA: 9.03'
  };

  experience = [
    {
      company: 'LTIMindtree',
      position: 'Software Engineer',
      period: 'Dec 2024 – Present',
      description: 'Developed and tested secure RESTful APIs and Angular modules using OAuth 2.0 and role-based access controls, implementing encryption/decryption and concurrent login restrictions.'
    }
  ];

  projects: Project[] = [
    {
      title: 'iTime',
      description: 'Enterprise platform supporting 85,000+ employees for timesheets, holidays, and billing workflows. Created custom webchat for AI agent interface with API orchestration achieving 400% engagement increase.',
      technologies: ['Angular', 'ASP.NET Core', 'AI Agents', 'SQL Server'],
      period: 'Feb 2025 – Present'
    },
    {
      title: 'Impressions',
      description: 'Created APIs for survey authoring, scheduling, and reporting. Implemented Angular validations handling 25,000+ employee responses with department-level role segmentation.',
      technologies: ['Angular', 'ASP.NET Core', 'REST APIs'],
      period: 'Feb 2025 – Present'
    },
    {
      title: 'SAIL',
      description: 'Implemented micro-frontend architecture with Native federation and Azure AD authentication. Optimized performance reducing load time by 35% through lazy loading and caching.',
      technologies: ['Angular', 'Micro-frontend', 'Azure AD', 'Native Federation'],
      period: 'Nov 2025 – Present'
    }
  ];
  
  skills: Skill[] = [
    {
      category: 'Languages',
      items: ['C#', 'Java', 'JavaScript', 'TypeScript']
    },
    {
      category: 'Frontend',
      items: ['Angular', 'RxJS', 'HTML', 'CSS', 'Bootstrap']
    },
    {
      category: 'Backend',
      items: ['ASP.NET Core', 'EF Core', 'ADO.NET', 'REST APIs']
    },
    {
      category: 'Database',
      items: ['SQL Server', 'MySQL', 'Stored Procedures']
    },
    {
      category: 'Tools',
      items: ['Git', 'Swagger', 'Postman', 'Visual Studio', 'VS Code']
    },
    {
      category: 'AI & Automation',
      items: ['Copilot Studio', 'GitHub Copilot', 'ChatGPT', 'Claude', 'AI Agents']
    },
    {
      category: 'Soft Skills',
      items: ['Communication', 'Troubleshooting', 'Leadership']
    }
  ];

  achievements = [
    'Ranked #1 Capstone Project during LTIMindtree training',
    'Got special Recognition in internal AI Hackathon',
    'Got "Super Crew" Award from BU head'
  ];

  ngOnInit() {
    // Setup scroll listener after component loads
    setTimeout(() => {
      if (this.blackboardContent) {
        this.setupScrollListener();
      }
    }, 100);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.updateArmPosition();
  }

  updateArmPosition() {
    // Get stickman SVG position
    if (!this.stickmanSvg) return;

    const svg = this.stickmanSvg.nativeElement;
    const svgRect = svg.getBoundingClientRect();
    
    // SVG coordinate system scale factor (SVG viewBox is 0-100, but displayed at svgRect size)
    const scaleX = 100 / svgRect.width;
    const scaleY = 100 / svgRect.height;
    
    // Calculate center of stickman in screen coordinates
    const stickmanScreenX = svgRect.left + (this.stickmanX / 100) * svgRect.width;
    const stickmanScreenY = svgRect.top + (this.stickmanY / 100) * svgRect.height;
    
    // Calculate direction from stickman to mouse
    const dx = this.mouseX - stickmanScreenX;
    const dy = this.mouseY - stickmanScreenY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize and scale to arm length
    const angle = Math.atan2(dy, dx);
    const armLength = 35;
    
    // Calculate arm end position (in SVG coordinates)
    this.armX2 = this.stickmanX + Math.cos(angle) * armLength;
    this.armY2 = this.stickmanY + Math.sin(angle) * armLength;
    
    // Hand position (slightly extended from arm end)
    this.handX = this.armX2 + Math.cos(angle) * 3;
    this.handY = this.armY2 + Math.sin(angle) * 3;
  }

  setupScrollListener() {
    if (!this.blackboardContent) return;
    
    const scrollElement = this.blackboardContent.nativeElement;
    scrollElement.addEventListener('scroll', () => this.onScroll(scrollElement));
  }

  onScroll(scrollElement: HTMLDivElement) {
    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    this.scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

    // Update teacher animation based on scroll progress
    if (this.scrollProgress < 0.3) {
      this.teacherAnimation = 'teaching-pull-down';
    } else if (this.scrollProgress < 0.6) {
      this.teacherAnimation = 'teaching-scrolling';
    } else if (this.scrollProgress < 0.9) {
      this.teacherAnimation = 'teaching-pull-up';
    } else {
      this.teacherAnimation = 'teaching-idle';
    }
  }
}
