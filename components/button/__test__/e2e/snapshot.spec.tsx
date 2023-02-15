import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import Button from '../..';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/snapshots`,
  customDiffDir: `${process.cwd()}/diffSnapshots`,
});
expect.extend({ toMatchImageSnapshot });
describe('测试Button快照', () => {
  it('测试快照是否正确', async () => {
    await jestPuppeteer.resetPage();
    await page.goto(`file://${process.cwd()}/tests/index.html`);
    const html = ReactDOMServer.renderToString(<Button label="按钮" />);
    await page.evaluate((innerHTML) => {
      document.querySelector('#root').innerHTML = innerHTML;
    }, html);
    const screenshot = await page.screenshot(); // 生成一张新的快照
    expect(screenshot).toMatchImageSnapshot(); // 比较新的和老的是否相同
  });
});
