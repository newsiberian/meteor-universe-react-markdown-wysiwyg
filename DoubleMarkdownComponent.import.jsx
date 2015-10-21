import Editor from './ReactMediumEditor';
import Tabs, {TabPane} from './editor/rc-tabs';
import onResize from './mixins/on-resize';
import i18n from '{universe:i18n}';

const T = i18n.createComponent('universe:markdown-wysiwyg');

export default React.createClass({
    displayName: 'DoubleMarkdownComponent',
    mixins: [onResize],
    getInitialState () {
        return {
            activeKey: '1',
            markdown: this.props.markdown
        };
    },
    render () {
        let style = {minHeight: this.state.height};
        return (
            <Tabs activeKey={this.state.activeKey} onChange={this.onChangeActiveTab}>
                <TabPane tab={T.__('visual')} key="1">
                    <Editor
                        className="editor"
                        style={style}
                        markdown={this.state.markdown}
                        onChange={this.onChange}
                        />
                </TabPane>
                <TabPane tab={T.__('markdown')} key="2">
                    <textarea className="editor"
                              style={style}
                              value={this.state.markdown}
                              onChange={event => this.onChange(event.target.value)}
                              placeholder={T.__('typeYourText')}
                        />
                </TabPane>
            </Tabs>
        );
    },
    onChangeActiveTab (key) {
        this.setState({
            activeKey: key
        });
    },
    onResize () {
        this.setState({height: Math.max(React.findDOMNode(this).clientHeight, 100)});
    },
    onChange (markdown) {
        this.setState({markdown});
        if (this.props.onChange) {
            this.props.onChange(markdown);
        }
    }
});