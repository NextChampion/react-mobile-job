/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2020-06-21 21:47:18
 * @LastEditTime: 2020-06-21 22:00:52
 * @LastEditors: zhangcunxia
 * @Description:
 */

import React from 'react'

export default function JobForm(WrappedComponent) {
    return class Component extends WrappedComponent {
        state = {}
        handleChanged = (key, val) => {
            this.setState({ [key]: val })
        }
        render() {
            return <WrappedComponent {...this.props} handleChange={this.handleChanged} state={this.state} />
        }
    }
}

