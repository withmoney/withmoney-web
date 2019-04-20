import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as TransactionsActions from 'store/transactions';
import InputInline from 'components/InputInline';
import If from 'components/render-utils/If';
import ButtonRounded from 'components/ButtonRounded';

class TransactionsItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggleEditing = this.toggleEditing.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.save = this.save.bind(this);

    this.fields = [
      { name: 'transactionDate' },
      { name: 'name' },
      { name: 'CategoryId' },
      { name: 'value' },
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
          <div className={classCol}>
            <ButtonRounded type="button" onClick={this.save} medium isLoading={isLoading}>
              Save
            </ButtonRounded>
          </div>
        </If>
        <If condition={!isEditing}>
          <div className={classCol}>
            <input type="checkbox" />
          </div>
        </If>
      </Fragment>
    );
  }

  render() {
    const { isEditing, formData } = this.state;
    const {
      transaction: { isLoading },
    } = this.props;
    const classCol = classnames('table-transactions__col', {
      'table-transactions__col--is-editing': isEditing,
    });

    return (
      <div
        className={classnames('table-transactions__row', {
          'table-transactions__row--is-editing': isEditing,
        })}
        onDoubleClick={this.onDoubleClick}
      >
        {this.fields.map(field => (
          <div key={field.name} className={classCol}>
            <InputInline
              isEditing={isEditing}
              name={field.name}
              className="table-transactions__input"
              defaultValue={formData[field.name]}
              disabled={isLoading}
              onChange={this.handleInput}
            />
          </div>
        ))}
        {this.renderAction(classCol)}
      </div>
    );
  }
}

TransactionsItem.propTypes = {
  actions: PropTypes.shape({
    transaction: PropTypes.shape({
      put: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.number,
    transactionDate: PropTypes.string,
    name: PropTypes.string,
    CategoryId: PropTypes.number,
    value: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
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
