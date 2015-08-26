var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
	postcss([ plugin(opts) ]).process(input).then(function (result) {
		expect(result.css).to.eql(output);

		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
};

describe('postcss-unmq', function () {
	it('screen and (min-width: 30em) ... preserve child rules ... default options', function (done) {
		test(
			'@media screen and (min-width: 30em) { a { color: black } } b { color: blue }',
			'a { color: black } b { color: blue }',
			{},
			done
		);
	});

	it('screen and (min-aspect-ratio: 1 ... preserve child rules ... default options', function (done) {
		test(
			'@media screen and (min-aspect-ratio: 1) { a { color: black } } b { color: blue }',
			'a { color: black } b { color: blue }',
			{},
			done
		);
	});

	it('screen and (max-width: 30em) ... remove child rules ... default options', function (done) {
		test(
			'@media screen and (max-width: 30em) { a { color: black } } b { color: blue }',
			'b { color: blue }',
			{},
			done
		);
	});

	it('screen and (max-aspect-ratio: 1) ... remove child rules ... default options', function (done) {
		test(
			'@media screen and (max-aspect-ratio: 1) { a { color: black } } b { color: blue }',
			'b { color: blue }',
			{},
			done
		);
	});

	it('screen and (max-width: 30em) ... preserve child rules ... { width: 320 }', function (done) {
		test(
			'@media screen and (max-width: 30em) { a { color: black } } b { color: blue }',
			'a { color: black } b { color: blue }',
			{
				width: 320
			},
			done
		);
	});

	it('screen and (min-width: 30em) ... remove child rules ... { width: 320 }', function (done) {
		test(
			'@media screen and (min-width: 30em) { a { color: black } } b { color: blue }',
			'b { color: blue }',
			{
				width: 320
			},
			done
		);
	});

	it('screen and (max-aspect-ratio: 1) ... preserve child rules ... { width: 320 }', function (done) {
		test(
			'@media screen and (max-aspect-ratio: 1) { a { color: black } } b { color: blue }',
			'a { color: black } b { color: blue }',
			{
				width: 320
			},
			done
		);
	});

	it('screen and (min-aspect-ratio: 1) ... remove child rules ... { width: 320 }', function (done) {
		test(
			'@media screen and (min-aspect-ratio: 1) { a { color: black } } b { color: blue }',
			'b { color: blue }',
			{
				width: 320
			},
			done
		);
	});
});
