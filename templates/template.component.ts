import * as React from 'react';
import { default as TemplateLayout } from './template.layout';

export interface TemplateProps {
  color?: string;
  background?: string;
}

interface TemplateState {
  defaultColor: string;
  defaultBackground: string;
}

export default class TemplateComponent extends React.Component<TemplateProps, TemplateState> {
  state = {
    defaultColor: 'white',
    defaultBackground: 'black'
  }

  render() {
    return (
      <TemplateLayout
        color={this.props.color || this.state.defaultColor}
        background={this.props.background || this.state.defaultBackground}
      />
    );
  }
}
