import { withApollo } from "../utils/withApollo";

const Index = () => <div>Hello World</div>;

export default withApollo({ ssr: true })(Index);
