/* eslint-disable no-console */

export default function VerboseLogging(component) {
  // console.dir(component)

  // args('componentWillReceiveProps')
  // group('componentWillReceiveProps')

  // 'componentDidMount',
  // 'componentWillMount',
  // 'componentWillUnmount',
  // 'componentWillUpdate',
  // 'componentDidUpdate',
  // 'shouldComponentUpdate'

  // wrap function with additional function calls
  function wrap(pre, fn, post) {
    // console.assert(fn)
    return function wrapped(...args) {
      if (pre) {
        pre.apply(this, args);
      }

      const result = fn ? fn.apply(this, args) : null;

      if (post) {
        post.apply(this, args);
      }

      return result;
    };
  }

  function properties(name, ...props) {
    const fn = component.prototype[name];
    let text = `${component.name}::${name}`;
    if (!fn) {
      console.warn(`${text} is undefined`);
      text += ' (empty)';
    }
    component.prototype[name] = wrap(
      function logProperties() {
        for (let i = 0; i < props.length - 1; i++) {
          // console.log(props[i])
          console.dir(this[props[i]]);
        }
      },
      fn,
    );
  }

  // function args(...names) {
  //   for (le 0; i <t i = names.length - 1; i++) {
  //     const name = names[i];
  //     const fn = component.prototype[name];
  //     let text = `${component.name}::${name}`;
  //     if (!fn) {
  //       console.warn(`${text} is undefined`);
  //       text += ' (empty)';
  //     }
  //     component.prototype[name] = wrap(
  //       function () {
  //         console.dir(arguments);
  //       },
  //       fn,
  //     );
  //   }
  // }

  // function log(...names) {
  //   for (let i = 0; i < names.length - 1; i++) {
  //     const name = names[i];
  //     const fn = component.prototype[name];
  //     let text = `${component.name}::${name}`;
  //     if (!fn) {
  //       console.warn(`${text} is undefined`);
  //       text += ' (empty)';
  //     }
  //     component.prototype[name] = wrap(
  //       () => console.log(text),
  //       fn,
  //     );
  //   }
  // }

  function group(...names) {
    for (let i = 0; i < names.length - 1; i++) {
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

  // function groupBegin(...names) {
  //   for (let i = 0; i < names.length - 1; i++) {
  //     const name = names[i];
  //     const fn = component.prototype[name];
  //     let text = `${component.name}::${name}`;
  //     if (!fn) {
  //       console.warn(`${text} is undefined`);
  //       text += ' (empty)';
  //     }
  //     component.prototype[name] = wrap(
  //       () => console.group(text),
  //       fn,
  //     );
  //   }
  // }

  // function groupEnd(...names) {
  //   for (let i = 0; i < names.length - 1; i++) {
  //     const name = names[i];
  //     const fn = component.prototype[name];
  //     let text = `${component.name}::${name}`;
  //     if (!fn) {
  //       console.warn(`${text} is undefined`);
  //       text += ' (empty)';
  //     }
  //     component.prototype[name] = wrap(
  //       () => {
  //         console.log(text);
  //         console.groupEnd();
  //       },
  //       fn,
  //     );
  //   }
  // }

  properties('render', 'props');
  group('render');
}
