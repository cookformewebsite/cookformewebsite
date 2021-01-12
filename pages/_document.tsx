import { NextPageContext } from "next";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <script src="https://www.paypal.com/sdk/js?client-id=AQyVFJU-a55h9DtAD1cFptX1ttBi8mUuBzNcZt1hpI9rcBpVLL8tI5iqBmJgET8hGUB78qEt-G1c7gwr&currency=CAD"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
