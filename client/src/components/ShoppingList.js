import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getItems, deleteItems } from '../actions/itemActions';

import ItemModal from './layouts/ItemModal';

class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItems(id);
    };

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <ItemModal />

                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} className='show fade'>
                                <ListGroupItem>
                                    <Button
                                        color='danger'
                                        className='mr-2'
                                        size='sm'
                                        onClick={this.onDeleteClick.bind(this, _id)}
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

const mapStateToProps = state => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { getItems, deleteItems }
)(ShoppingList);
