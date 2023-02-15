import React, { Component } from 'react';
import { mount } from 'enzyme';
import Button from '../..';

describe('测试Button', () => {
  it('测试Button是否正确挂载', () => {
    expect(() => mount(<Button label="按钮" />)).not.toThrow();
  });
});
