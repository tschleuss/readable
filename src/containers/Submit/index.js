import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../actions/actionApi'
import Autocomplete from 'react-autocomplete'
import PropTypes from 'prop-types'
import './index.css'

class Submit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            category: '',
            inputCategory: ''
        }
        this.matchCategoryToTerm = this.matchCategoryToTerm.bind(this)
    }

    componentWillMount() {
        this.props.getCategories()
    }

    matchCategoryToTerm(state, value) {
        return (state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    }

    render() {
        const { categories } = this.props
        return (
            <div>
                <nav className="page-nav">
                    <div className="page-nav-options"></div>
                    <div className="page-nav-sort"></div>
                </nav>
                <main className="page-main">
                    <div className="submit-topic">
                        <article className="submit-container">
                            <span className="submit-title">
                                <label className="submit-label">title</label>
                                <input type="text" 
                                       name="title" 
                                       className="submit-title-input" 
                                       value={this.state.title} 
                                       onChange={event => this.setState({ title: event.target.value })}/>
                            </span>
                            <span className="submit-body">
                                <label className="submit-label">text</label>
                                <textarea name="body" 
                                          className="submit-body-textarea" 
                                          rows="10" 
                                          value={this.state.body} 
                                          onChange={event => this.setState({ body: event.target.value })}/>
                            </span>
                            <span className="submit-category">
                                <label className="submit-label">category</label>
                                <Autocomplete
                                    value={this.state.inputCategory}
                                    inputProps={{ className: 'submit-title-input' }}
                                    wrapperStyle={{ 
                                        'width': '100%', 
                                        'display': 'block', 
                                        'boxSizing': 'border-box',
                                        'position': 'relative'
                                    }}
                                    items={categories}
                                    getItemValue={item => item.name}
                                    shouldItemRender={this.matchCategoryToTerm}
                                    onSelect={value => this.setState({ category: value, inputCategory: value })}
                                    onChange={(event, value) => this.setState({ category: '', inputCategory: value })}
                                    renderMenu={children => (
                                        <div className="submit-category-result">
                                            {children}
                                        </div>
                                    )}
                                    renderItem={(item, isHighlighted) =>
                                        <div key={item.name} className={isHighlighted ? 'submit-category-result-option selected' : 'submit-category-result-option'}>
                                            {item.name}
                                        </div>
                                    }>
                                </Autocomplete>
                            </span>
                            <div className="submit-actions">
                                <button onClick={() => this.onSave(this.state.value)} className="edit-textarea-action">save</button>
                                <button onClick={() => this.onCancel()} className="edit-textarea-action">cancel</button>
                            </div>
                        </article>
                    </div>
                </main>
            </div>
        )
    }
}

Submit.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    const { categories } = state
    return {
        categories: categories.items
    }
}

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
