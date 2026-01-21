import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TerminalCommand {
  type: 'input' | 'output' | 'error' | 'command';
  content: string;
}
@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent {
  currentInput: string = '';
  lines: TerminalCommand[] = [
    {
      type: 'output',
      content: 'Welcome to the terminal. Type "help" for a list of commands.',
    },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' },
  ];

  commandHistory: string[] = [];
  historyIndex: number = -1;
  readonly commands = {
    help: () => {
      return [
        'Available commands:',
        '  help        - Show this help message',
        '  about       - Learn about me',
        '  skills      - Display my technical skills',
        '  projects    - List featured projects',
        '  contact     - Get my contact information',
        '  experience  - View work experience',
        '  clear       - Clear the terminal',
        '  github      - Open my GitHub profile',
        '  linkedin    - Open my LinkedIn profile',
        '',
      ];
    },
    about: () => {
      return [
        'Ankit Kumar - Senior Software Engineer',
        '',
        'I design and ship backend-heavy, customer-facing systems with',
        'Java 17+, Spring Boot 3, Docker, and Angular. I focus on clean',
        'architecture, measurable performance, and operational excellence.',
        '',
        'Specializing in:',
        '  • Banking and fintech systems',
        '  • High-scale resilient architectures',
        '  • Immutability and concurrency patterns',
        '  • Full-stack development',
        '',
      ];
    },
    skills: () => {
      return [
        'Technical Skills:',
        '',
        'Backend:',
        '  • Java 17+, Spring Boot 3, Spring Data JPA',
        '  • Resilience4j (Circuit Breaker, Retry, Rate Limiter)',
        '  • WebSocket, REST APIs',
        '  • PostgreSQL, Redis, MongoDB',
        '',
        'Frontend:',
        '  • Angular 19, TypeScript, RxJS',
        '  • Responsive UI, Server-Side Rendering',
        '  • HTML5, CSS3/SCSS',
        '',
        'DevOps & Tools:',
        '  • Docker, Nginx, SSL/TLS',
        '  • Git, GitHub Actions',
        '  • Testing (JUnit, Mockito, Jasmine)',
        '',
      ];
    },
    projects: () => {
      return [
        'Featured Projects:',
        '',
        '1. Banking App (Immutable Core)',
        '   ACID transactions, immutable records, circuit breakers,',
        '   retries, WebSocket alerts.',
        '   Tech: Spring Boot, PostgreSQL, Resilience4j',
        '',
        '2. Interview Prep Platform',
        '   Searchable Q&A, mock interviews, progress tracking,',
        '   spaced repetition.',
        '   Tech: Angular, Spring Boot, MongoDB',
        '',
        '3. Performance Playbook',
        '   Network latency drills, GC tuning demos, concurrency',
        '   patterns with metrics.',
        '   Tech: Java 17+, RxJS, Observability',
        '',
      ];
    },
    contact: () => {
      return [
        'Contact Information:',
        '',
        '  Email:    ankitdhr07@gmail.com',
        '  LinkedIn: linkedin.com/in/ankit-kumar-dhar',
        '  GitHub:   github.com/ankitdhar07',
        '',
        'Available for backend-heavy roles, banking/fintech systems,',
        'and high-scale products.',
        '',
      ];
    },
    experience: () => {
      return [
        'Work Experience:',
        '',
        'Senior Software Engineer',
        '  • Designed and built resilient banking systems',
        '  • Implemented circuit breakers and retry patterns',
        '  • Optimized performance for high-scale applications',
        '  • Led full-stack development with Spring Boot & Angular',
        '',
      ];
    },
    clear: () => {
      this.lines = [];
      return [];
    },
    github: () => {
      window.open('https://github.com/ankitdhar07', '_blank');
      return ['Opening GitHub profile...', ''];
    },
    linkedin: () => {
      window.open('https://www.linkedin.com/in/ankit-kumar-dhar/', '_blank');
      return ['Opening LinkedIn profile...', ''];
    },
  };

  executeCommand(input: string) {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add command to history
    this.commandHistory.push(trimmedInput);
    this.historyIndex = this.commandHistory.length;

    // Add command line
    this.lines.push({ type: 'command', content: `$ ${trimmedInput}` });

    // Parse and execute
    const [cmd, ...args] = trimmedInput.toLowerCase().split(' ');
    const commandFn = this.commands[cmd as keyof typeof this.commands];

    if (commandFn) {
      const output = commandFn();
      output.forEach((line) => {
        this.lines.push({ type: 'output', content: line });
      });
    } else {
      this.lines.push({
        type: 'error',
        content: `Command not found: ${cmd}. Type "help" for available commands.`,
      });
      this.lines.push({ type: 'output', content: '' });
    }

    // Clear input
    this.currentInput = '';

    // Scroll to bottom
    setTimeout(() => this.scrollToBottom(), 0);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.executeCommand(this.currentInput);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.currentInput = this.commandHistory[this.historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.currentInput = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.currentInput = '';
      }
    }
  }

  scrollToBottom() {
    const terminal = document.querySelector('.terminal-output');
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }

  focusInput() {
    const input = document.querySelector('.terminal-input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }
}
