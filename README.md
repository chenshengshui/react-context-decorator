# React Context Decorator 封装

## 使用
```
npm install 'react-context-decorator' --save
```

## 绑定 context

```javascript

// 绑定context
import { ContextProvider } from 'react-context-decorator';
import ChildComponent from './ChildComponent';
import React, { Component } from 'react';


class Index extends Component {


  render() {
    const props = {
        color: 'red',
        name: 'context'
    };
    return (
      <ContextProvider
        {
            ...props
        }
      >
        <ChildComponent />
      </ContextProvider>
    );
  }
}

export default Index;


```

```javascript
// 子组件注入context
import React, { Component } from 'react';
import { injectContext } from 'react-context-decorator';

@injectContext(['type', 'name'])
class ChildComponent extends Component {

  render() {
      const { type, name } = this.props;
    return (
      <div>
        {name} 
      </div>
    );
  }
}

export default ChildComponent;

```

## 推荐文章
[https://juejin.im/post/5c26c7f7e51d4511fb7da3ca](https://juejin.im/post/5c26c7f7e51d4511fb7da3ca)