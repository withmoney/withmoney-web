import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as TransactionsActions from '../store/modules/transactions';
import InputInline from './InputInline';
import If from './render-utils/If';

class TransactionsItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggleEditing = this.toggleEditing.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.save = this.save.bind(this);

    this.fields = [
      {
        name: 'transactionDate',
      },
      {
        name: 'name',
      },
      {
        name: 'CategoryId',
      },
      {
        name: 'value',
      },
    ];

    this.state = {
      isEditing: false,
      formData: props.transaction,
    };
  }

  onDoubleClick() {
    const { isEditing } = this.state;

    if (!isEditing) {
      this.toggleEditing();
    }
  }

  handleInput({ target: { name, value } }) {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [name]: value,
      },
    });
  }

  async save() {
    try {
      await this.props.actions.transaction.put(this.state.formData);

      this.toggleEditing();
    } catch (error) {
      console.error(error);
    }
  }

  toggleEditing() {
    const { isEditing } = this.state;

    if (!isEditing) {
      this.setState({
        formData: this.props.transaction,
      });
    }


    this.setState({
      isEditing: !isEditing,
    });
  }

  render() {
    const { isEditing, formData } = this.state;
    const classCol = classnames(
      'table-transactions__col',
      { 'table-transactions__col--is-editing': isEditing },
    );

    return (
      <div className="table-transactions__row" onDoubleClick={this.onDoubleClick}>
        {this.fields.map(field => (
          <div
            key={field.name}
            className={classCol}
          >
            <InputInline
              isEditing={isEditing}
              name={field.name}
              defaultValue={formData[field.name]}
              onChange={this.handleInput}
            />
          </div>
        ))}
        <If condition={isEditing}>
          <div className={classCol}>
            <button type="button" onClick={this.save}>Save</button>
          </div>
        </If>
        <If condition={!isEditing}>
          <div className={classCol}>
            <input type="checkbox" />
          </div>
        </If>
      </div>
    );
  }
}

TransactionsItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number,
    transactionDate: PropTypes.string,
    name: PropTypes.string,
    CategoryId: PropTypes.number,
    value: PropTypes.string,
  }).isRequired,
};

const mapDispachToProps = dispatch => ({
  actions: {
    transaction: bindActionCreators(TransactionsActions, dispatch),
  },
});

export default connect(null, mapDispachToProps)(TransactionsItem);
