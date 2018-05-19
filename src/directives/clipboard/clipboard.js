// Inspired by https://github.com/Inndy/vue-clipboard2
const Clipboard = require('clipboard');

if (!Clipboard) {
  throw new Error('you shold npm install `clipboard` --save at first ');
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-arrow-callback */
export default {
  bind(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value;
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value;
        },
        action() {
          return binding.arg === 'cut' ? 'cut' : 'copy';
        },
      });

      clipboard.on('success', function success(e) {
        const callback = el._v_clipboard_success;
        if (callback) {
          callback(e);
        }
      });
      clipboard.on('error', function error(e) {
        const callback = el._v_clipboard_error;
        if (callback) {
          callback(e);
        }
      });
      el._v_clipboard = clipboard;
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value;
    } else {
      el._v_clipboard.text = function text() {
        return binding.value;
      };
      el._v_clipboard.action = function action() {
        return binding.arg === 'cut' ? 'cut' : 'copy';
      };
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success;
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error;
    } else {
      el._v_clipboard.destroy();
      delete el._v_clipboard;
    }
  },
};