import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';

class ShoppingList extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <Button
                    color='info'
                    className='mb-2'
                    onClick={() => {
                        const name = prompt('Enter Item');
                        if (name) {
                            this.setState({
                                items: [...items, { id: uuid(), name }]
                            });
                        }
                    }}
                >
                    Add Item
                </Button>

                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} className='show fade'>
                                <ListGroupItem>
                                    <Button
                                        color='danger'
                                        className='mr-2'
                                        size='sm'
                                        onClick={() => {
                                            this.setState({
                                                items: items.filter(item => item.id !== id)
                                            });
                                        }}
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { getItems }
)(ShoppingList);
