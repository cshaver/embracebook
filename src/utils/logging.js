const INFO = 'ℹ️ ';

export function VerboseLogging(component) {
  // console.dir(component)

  properties('render', 'props');
  group('render');

  // args('componentWillReceiveProps')
  // group('componentWillReceiveProps')

  // 'componentDidMount',
  // 'componentWillMount',
  // 'componentWillUnmount',
  // 'componentWillUpdate',
  // 'componentDidUpdate',
  // 'shouldComponentUpdate'

  function properties(name, ...props) {
    const fn = component.prototype[name];
    let text = `${component.name}::${name}`;
    if (!fn) {
      console.warn(`${text} is undefined`);
      text += ' (empty)';
    }
    component.prototype[name] = wrap(
      function () {
        for (let i = props.length - 1; i >= 0; i--) {
          // console.log(props[i])
          console.dir(this[props[i]]);
        }
      },
      fn,
    );
  }

  function args(...names) {
    for (let i = names.length - 1; i >= 0; i--) {
      const name = names[i];
      const fn = component.prototype[name];
      let text = `${component.name}::${name}`;
      if (!fn) {
        console.warn(`${text} is undefined`);
        text += ' (empty)';
      }
      component.prototype[name] = wrap(
        function () {
          console.dir(arguments);
        },
        fn,
      );
    }
  }

  function log(...names) {
    for (let i = names.length - 1; i >= 0; i--) {
      const name = names[i];
      const fn = component.prototype[name];
      let text = `${component.name}::${name}`;
      if (!fn) {
        console.warn(`${text} is undefined`);
        text += ' (empty)';
      }
      component.prototype[name] = wrap(
        () => console.log(text),
        fn,
      );
    }
  }

  function group(...names) {
    for (let i = names.length - 1; i >= 0; i--) {
      const name = names[i];
      const fn = component.prototype[name];
      let text = `${component.name}::${name}`;
      if (!fn) {
        console.warn(`${text} is undefined`);
        text += ' (empty)';
      }
      component.prototype[name] = wrap(
        () => (fn ? console.group(text) : console.groupCollapsed(text)),
        fn,
        console.groupEnd,
      );
    }
  }

  function groupBegin(...names) {
    for (let i = names.length - 1; i >= 0; i--) {
      const name = names[i];
      const fn = component.prototype[name];
      let text = `${component.name}::${name}`;
      if (!fn) {
        console.warn(`${text} is undefined`);
        text += ' (empty)';
      }
      component.prototype[name] = wrap(
        () => console.group(text),
        fn,
      );
    }
  }

  function groupEnd(...names) {
    for (let i = names.length - 1; i >= 0; i--) {
      const name = names[i];
      const fn = component.prototype[name];
      let text = `${component.name}::${name}`;
      if (!fn) {
        console.warn(`${text} is undefined`);
        text += ' (empty)';
      }
      component.prototype[name] = wrap(
        () => {
          console.log(text);
          console.groupEnd();
        },
        fn,
      );
    }
  }

  // wrap function with additional function calls
  function wrap(pre, fn, post) {
    // console.assert(fn)
    return function () {
      if (pre) {
        pre.apply(this, arguments);
      }

      const result = fn ? fn.apply(this, arguments) : null;

      if (post) {
        post.apply(this, arguments);
      }

      return result;
    };
  }
}
