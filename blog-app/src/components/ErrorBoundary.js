import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    state = {
        hasError : false
    }

    static getDerivedStateError(error) {
        return {hasError : true}
    }

    render() {
        if(this.state.hasError) {
            return <h1>Something went wrong</h1>
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
