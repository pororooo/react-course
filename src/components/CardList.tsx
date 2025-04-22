import { Component } from 'react';
import { Card } from './Card';

interface CardListProps {
  items: { name: string; description: string }[];
}

export class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <div>
        {items.map((item, index) => (
          <Card key={index} name={item.name} description={item.description} />
        ))}
      </div>
    );
  }
}
export default CardList;
