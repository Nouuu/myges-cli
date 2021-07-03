import { Command } from "commander";
import inquirer from "inquirer";
import * as configurator from '../config';
import * as display from '../display';
import * as api from '../ges-api';

export function register(program: Command) {
  program
    .command('courses [year]')
    .option('-d, --debug', 'debug mode')
    .option('-r, --raw', 'output the raw data')
    .description('list courses')
    .action(action);
}

interface CommandOptions {
  debug: boolean;
  raw: boolean;
}

async function action(year: string, options: CommandOptions) {
  try {
    const config = await configurator.load(true);

    if (!year) {
      const answers = await inquirer.prompt([
        {
          message: 'Choose a year',
          name: 'year',
          type: 'list',
          choices: await api.get_years(config),
        },
      ]);

      // eslint-disable-next-line no-param-reassign
      year = answers.year;
    }

    const courses = await api.request('GET', `/me/${year}/courses`, config)

    if (options.raw) {
      console.log(JSON.stringify(courses));
    } else if (!courses) {
      console.log('Nothing to display.');
    } else {
      const trimesters = [...new Set(courses.map((course) => course.trimester))].sort();

      trimesters.forEach((trimester) => {
        const trimesterCourses = courses.filter((course) => course.trimester === trimester).map((course) => ({
          rc_id: course.rc_id,
          Year: course.year,
          Trimester: `${course.trimester} (${course.trimester_id})`,
          Name: course.name,
          'Student group': `${course.student_group_name} (${course.student_group_id})`,
          Teacher: `${course.teacher} (${course.teacher_id})`,
        }));

        display.table(trimesterCourses);
      });
    }
  } catch (e) {
    if (options.debug) {
      console.error(e);
    } else {
      console.error(e.message);
    }
  }
}
