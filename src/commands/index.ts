import { Command } from 'commander';
import * as absencesCommand from './absences';
import * as agendaCommand from './agenda';
import * as calendarCommand from './calendar-sync';
import * as contributeCommand from './contribute';
import * as coursesCommand from './courses';
import * as gradesCommand from './grades';
import * as loginCommand from './login';
import * as logoutCommand from './logout';
import * as projectsCommand from './projects';
import * as requestCommand from './request';

export function register(program: Command) {
  absencesCommand.register(program);
  agendaCommand.register(program);
  calendarCommand.register(program);
  contributeCommand.register(program);
  coursesCommand.register(program);
  gradesCommand.register(program);
  loginCommand.register(program);
  logoutCommand.register(program);
  projectsCommand.register(program);
  requestCommand.register(program);
}
