var extend = require('util')._extend;
var postcss = require('postcss');
var mediaQuery = require('css-mediaquery');

var defaultOpts = {
	type:       'screen',
	width:      1024,
	height:     768,
	resolution: '1dppx',
	color:      3
};

module.exports = postcss.plugin('postcss-unmq', function (opts) {
	opts = extend(extend({}, defaultOpts), opts);

	if (!('device-width' in opts)) {
		opts['device-width'] = opts.width;
	}

	if (!('device-height' in opts)) {
		opts['device-height'] = opts.height;
	}

	if (!('aspect-ratio' in opts)) {
		opts['aspect-ratio'] = opts['device-width'] / opts['device-height'];
	}

	if (!('orientation' in opts)) {
		opts.orientation = opts['aspect-ratio'] >= 1 ? 'landscape' : 'portrait';
	}

	return function (css) {
		css.walkAtRules('media', function (rule) {
			if (mediaQuery.match(rule.params, opts)) {
				rule.replaceWith(rule.nodes);
			} else {
				rule.remove();
			}
		});
	};
});
