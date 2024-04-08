import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VExample from './VExample.vue';

describe('Тесты для компонента VExample', () => {
  it('Успешное монтирование компонента', () => {
    const wrapper = mount(VExample);

    expect(wrapper.text()).toEqual('Example component');
  });

  it('Совпадение со snapshot', () => {
    const wrapper = mount(VExample);

    expect(wrapper).toMatchSnapshot();
  });
});
