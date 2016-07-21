var data = [
    {
        id: 1,
        author: 'Superdog354',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est numquam sapiente quos ipsam vitae placeat porro animi aspernatur nihil dignissimos.',
        rating: 5,
        avatarType: 'dog'
    },
    {
        id: 2,
        author: 'Catnip152',
        body: 'na na na na na na BATMAN!!!',
        rating: 4,
        avatarType: 'cat'
    }
];

var CommentItem = React.createClass({

    render: function() {

        // Random generated dog or cats :)
        var style = {
            backgroundImage: 'url(http://loremflickr.com/320/240/' + this.props.avatarType + '?random=' + this.props.id + ')'
        };

        return (
            <li className='comment comment-list__item'>
                <div className='comment__author'>
                    <div className='comment__author-avatar' style={style}></div>
                    <div className='comment__author-name'>{this.props.author}</div>
                </div>
                <div className='comment__body'>
                    <CommentRating rating={this.props.rating} />
                    <p>{this.props.body}</p>
                </div>
            </li>
        );
    }
});

var CommentRating = React.createClass({
    render: function() {
        return (
            <div className='comment__rating'>rating: {this.props.rating}</div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <CommentItem author={comment.author} avatarType={comment.avatarType} key={comment.id} body={comment.body} rating={comment.rating} id={comment.id}/>
            );
        });

        return (
            <ul className='comment-list'>
                {commentNodes}
            </ul>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function() {
        return {
            author: '',
            body: ''
        };
    },
    handleAuthorChange: function(e) {
        this.setState({
            author: e.target.value
        })
    },
    handleBodyChange: function(e) {
        this.setState({
            body: e.target.value
        });
    },
    handleRatingChange: function(e) {
        this.setState({
            rating: e.target.value
        });
    },
    handleAvatarTypeChange: function(e) {
        this.setState({
            avatarType: e.target.value
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var author = this.state.author.trim();
        var body   = this.state.body.trim();
        var rating = this.state.rating;
        var id     = data.length + 1;
        var avatarType = this.state.avatarType

        if (!body || !author || !rating) return;

        this.props.onCommentSubmit({
            author: author,
            body: body,
            id: id,
            rating: rating
        })

        this.setState({
            author: '',
            body: ''
        });
    },
    render: function() {
        return (
            <form className='comment-form page-comments__form' onSubmit={this.handleSubmit}>
                <ul className='comment-form__list'>
                    <li className='comment-form__item'>
                        <label className='comment-form__label'>Author</label>
                        <input className='comment-form__author-input' type='text' placeholder='Your name' value={this.state.author} onChange={this.handleAuthorChange} />
                    </li>
                    <li className='comment-form__item'>
                        <label className='comment-form__label'>Dog or cat?</label>
                        <label className='comment-form__avatar-item'>
                            <input type='radio' name='avatar' value='dog' onChange={this.handleAvatarTypeChange} />
                            <span>Dog</span>
                        </label>
                        <label className='comment-form__avatar-item'>
                            <input type='radio' name='avatar' value='cat' onChange={this.handleAvatarTypeChange} />
                            <span>Cat</span>
                        </label>
                    </li>
                    <li className='comment-form__item'>
                        <label className='comment-form__label'>New comment</label>
                        <textarea className='comment-form__body-input' placeholder='What do you want to say?' value={this.state.body} onChange={this.handleBodyChange} />
                    </li>
                    <li className='comment-form__item'>
                        <label className='comment-form__label'>How would you rate your trip?</label>
                            <ul className='rating'>
                                <li className='rating__item'>
                                    <label className='rating__label'>
                                        <input className='rating__input' type='radio' name='rating' value='1' onChange={this.handleRatingChange} />
                                        <span className='rating__star'></span>
                                        <span className='rating__number'>1</span>
                                    </label>
                                </li>
                                <li className='rating__item'>
                                    <label className='rating__label'>
                                        <input className='rating__input' type='radio' name='rating' value='2' onChange={this.handleRatingChange} />
                                        <span className='rating__star'></span>
                                        <span className='rating__number'>2</span>
                                    </label>
                                </li>
                                <li className='rating__item'>
                                    <label className='rating__label'>
                                        <input className='rating__input' type='radio' name='rating' value='3' onChange={this.handleRatingChange} />
                                        <span className='rating__star'></span>
                                        <span className='rating__number'>3</span>
                                    </label>
                                </li>
                                <li className='rating__item'>
                                    <label className='rating__label'>
                                        <input className='rating__input' type='radio' name='rating' value='4' onChange={this.handleRatingChange} />
                                        <span className='rating__star'></span>
                                        <span className='rating__number'>4</span>
                                    </label>
                                </li>
                                <li className='rating__item'>
                                    <label className='rating__label'>
                                        <input className='rating__input' type='radio' name='rating' value='5' onChange={this.handleRatingChange} />
                                        <span className='rating__star'></span>
                                        <span className='rating__number'>5</span>
                                    </label>
                                </li>
                            </ul>
                    </li>
                    <li className='comment-form__item'>
                        <input className='comment-form__submit' type='submit' value='Add comment' />
                    </li>
                    <li className='comment-form__item'>
                        <p>Pleae fill everything in before submitting :)</p>
                    </li>
                </ul>
            </form>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {
            data: data
        };
    },
    handleCommentSubmit: function(comment) {
        data.unshift(comment)

        this.setState({
            data: data
        })
    },
    render: function() {
        return (
            <div>
                <h1 className='title page-comments__title'>Comments</h1>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
                <CommentList data={this.state.data}/>
            </div>
        );
    }
});

ReactDOM.render(<CommentBox data={data} />, document.getElementById('example'))