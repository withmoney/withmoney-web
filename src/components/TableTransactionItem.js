import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as TransactionsActions from 'store/transactions';
import InputInline from 'components/InputInline';
import If from 'components/render-utils/If';
import ButtonRounded from 'components/ButtonRounded';
import {
  TransactionActionsTypes,
  TransactionColumnsTypes,
  TransactionTypes
} from 'app/types/transactions';

class TransactionsItem extends React.Component {
  static columnClass(isEditing, column) {
    return classnames('table-transactions__col', {
      'table-transactions__col--is-editing': isEditing,
      [`table-transactions__col--${column}`]: column,
    });
  }

  constructor(props) {
    super(props);

    this.toggleEditing = this.toggleEditing.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.save = this.save.bind(this);

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
    const { formData } = this.state;
    const {
      actions: { transaction },
    } = this.props;

    try {
      await transaction.put(formData);

      this.toggleEditing();
    } catch (error) {
      console.error(error);
    }
  }

  toggleEditing() {
    const { isEditing } = this.state;
    const { transaction: formData } = this.props;

    if (!isEditing) {
      this.setState({ formData });
    }

    this.setState({
      isEditing: !isEditing,
    });
  }

  renderAction(classCol) {
    const { isEditing } = this.state;
    const {
      transaction: { isLoading },
    } = this.props;

    return (
      <Fragment>
        <If condition={isEditing}>
          <ButtonRounded
            type="button"
            className="btn-save"
            onClick={this.save}
            isLoading={isLoading}
            medium
          >
            Save
          </ButtonRounded>
          <ButtonRounded
            type="button"
            className="btn-cancel"
            onClick={this.toggleEditing}
            isLoading={isLoading}
            theme="gray"
            small
          >
            <i className="fa fa-times" />
          </ButtonRounded> 
        </If>
        <If condition={!isEditing}>
          <ButtonRounded
            type="button"
            className="btn-edit"
            onClick={this.onDoubleClick}
            small
          >
            <i className="fa fa-edit" />
          </ButtonRounded> 
        </If>
      </Fragment>
    );
  }

  render() {
    const { isEditing, formData } = this.state;
    const {
      transaction: { isLoading },
      columns
    } = this.props;
    
    return (
      <div
        id={`transaction-${this.props.transaction.id}`}
        className={classnames('table-transactions__row', {
          'table-transactions__row--is-editing': isEditing,
        })}
      >
        {columns.map(field => {
          let children;
          const classCol = TransactionsItem.columnClass(isEditing, field.name)
          if (field.name === 'isPaid') {
            children = <input type="checkbox" />
          } else if (field.name === 'action') {
            children = this.renderAction(classCol)
          } else {
            children = (
              <InputInline
                isEditing={isEditing}
                name={field.name}
                className="table-transactions__input"
                defaultValue={formData[field.name]}
                disabled={isLoading}
                onChange={this.handleInput}
              />
            )
          }

          return (
            <div
              key={field.name}
              className={classCol}
              style={field.style}
            >
              <div className="table-transactions__col-inner">
                {children}
              </div>
           </div>
          )
        })}
      </div>
    );
  }
}

TransactionsItem.propTypes = {
  actions: TransactionActionsTypes.isRequired,
  columns: TransactionColumnsTypes,
  transaction: TransactionTypes,
};

TransactionsItem.defaultProps = {
  transaction: {
    isLoading: false,
  },
};

const mapDispachToProps = dispatch => ({
  actions: {
    transaction: bindActionCreators(TransactionsActions, dispatch),
  },
});

export default connect(
  null,
  mapDispachToProps,
)(TransactionsItem);
