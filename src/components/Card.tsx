import { Component } from 'react';

interface CardProps {
  name: string;
  description: string;
}

export class Card extends Component<CardProps> {
  render() {
    const { name, description } = this.props;
    return (
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    );
  }
}
export default Card;
