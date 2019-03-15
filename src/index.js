import React, { Component } from 'react';

export const Context = React.createContext();

export class ContextProvider extends Component {
    render() {
        return (
            <Context.Provider value={this.props.context}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

/**
 * 用注解的方式给子组件注入属性
 */

export const injectContext = (contexts) => RealComponent => {
    return class extends Component {
        render() {
            return (
                <Context.Consumer>
                    {context => {
                        // 将顶层的context分发到各层
                        let mapContext = {};
                        if(Array.isArray(contexts)) {
                            contexts.map(item => {
                                mapContext[item] = context[item];
                            });
                        }
                        return (
                            <RealComponent {...mapContext} {...this.props} />
                        )
                    }}
                </Context.Consumer>
            );
        }
    };
};
