'use strict';

var gulp = require('gulp'),
	file = require('gulp-file'),
	uuid = require('node-uuid'),
	faker = require('faker');

gulp.task('generate-mocks', function () {
	var workers = [];

	for (let i = 0; i < 500; i++) {
		let gender = Math.random() > 0.5 ? 1 : 0;

		workers.push({
			id: uuid.v4(),
			firstName: faker.name.firstName(gender),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			photo: faker.image.people(),
			team: Math.floor(Math.random() * 4)
		});
	}

	file('workers.json', JSON.stringify(workers, null, '\t'), { src: true })
		.pipe(gulp.dest('./public/mocks'));
});
