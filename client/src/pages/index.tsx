import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Layout>
      <h1>Hello Welcome To The Blog</h1>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
