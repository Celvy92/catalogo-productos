import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h2>Algo salió mal 😿</h2>
          <div className="alert alert-error">
            {String(this.state.error?.message || this.state.error)}
          </div>
          <button className="btn-primary" onClick={() => location.reload()}>
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
