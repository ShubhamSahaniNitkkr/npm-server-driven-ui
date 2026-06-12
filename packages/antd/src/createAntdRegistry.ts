import { createRegistry, type ComponentRegistry, type SDUIComponent } from '@shubhamsunnynitkkr/server-driven-ui';
import {
  ButtonAdapter,
  IconButtonAdapter,
} from './components/actions';
import {
  ListAdapter,
  PageAdapter,
  TableAdapter,
} from './components/data';
import {
  AlertAdapter,
  AvatarAdapter,
  BadgeAdapter,
  StatisticAdapter,
  TagAdapter,
  TextAdapter,
  TitleAdapter,
} from './components/display';
import {
  CheckboxAdapter,
  DatePickerAdapter,
  InputAdapter,
  MultiSelectAdapter,
  NumberAdapter,
  PasswordAdapter,
  RadioAdapter,
  SelectAdapter,
  SwitchAdapter,
  TextAreaAdapter,
} from './components/forms';
import {
  EmptyAdapter,
  SkeletonAdapter,
  SpinnerAdapter,
} from './components/feedback';
import {
  CardAdapter,
  CollapseAdapter,
  ColumnAdapter,
  DividerAdapter,
  GridAdapter,
  RowAdapter,
  TabsAdapter,
} from './components/layout';

export type AntdComponentType =
  | 'page'
  | 'input'
  | 'textarea'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'select'
  | 'multiselect'
  | 'datepicker'
  | 'row'
  | 'column'
  | 'grid'
  | 'card'
  | 'divider'
  | 'tabs'
  | 'collapse'
  | 'text'
  | 'title'
  | 'badge'
  | 'tag'
  | 'avatar'
  | 'alert'
  | 'statistic'
  | 'button'
  | 'iconButton'
  | 'spinner'
  | 'skeleton'
  | 'empty'
  | 'table'
  | 'list';

const ALL_COMPONENTS: AntdComponentType[] = [
  'page',
  'input',
  'textarea',
  'password',
  'number',
  'checkbox',
  'radio',
  'switch',
  'select',
  'multiselect',
  'datepicker',
  'row',
  'column',
  'grid',
  'card',
  'divider',
  'tabs',
  'collapse',
  'text',
  'title',
  'badge',
  'tag',
  'avatar',
  'alert',
  'statistic',
  'button',
  'iconButton',
  'spinner',
  'skeleton',
  'empty',
  'table',
  'list',
];

function getComponentMap(): Record<string, SDUIComponent> {
  return {
    page: PageAdapter as unknown as SDUIComponent,
    input: InputAdapter as unknown as SDUIComponent,
    textarea: TextAreaAdapter as unknown as SDUIComponent,
    password: PasswordAdapter as unknown as SDUIComponent,
    number: NumberAdapter as unknown as SDUIComponent,
    checkbox: CheckboxAdapter as unknown as SDUIComponent,
    radio: RadioAdapter as unknown as SDUIComponent,
    switch: SwitchAdapter as unknown as SDUIComponent,
    select: SelectAdapter as unknown as SDUIComponent,
    multiselect: MultiSelectAdapter as unknown as SDUIComponent,
    datepicker: DatePickerAdapter as unknown as SDUIComponent,
    row: RowAdapter as unknown as SDUIComponent,
    column: ColumnAdapter as unknown as SDUIComponent,
    grid: GridAdapter as unknown as SDUIComponent,
    card: CardAdapter as unknown as SDUIComponent,
    divider: DividerAdapter as unknown as SDUIComponent,
    tabs: TabsAdapter as unknown as SDUIComponent,
    collapse: CollapseAdapter as unknown as SDUIComponent,
    text: TextAdapter as unknown as SDUIComponent,
    title: TitleAdapter as unknown as SDUIComponent,
    badge: BadgeAdapter as unknown as SDUIComponent,
    tag: TagAdapter as unknown as SDUIComponent,
    avatar: AvatarAdapter as unknown as SDUIComponent,
    alert: AlertAdapter as unknown as SDUIComponent,
    statistic: StatisticAdapter as unknown as SDUIComponent,
    button: ButtonAdapter as unknown as SDUIComponent,
    iconButton: IconButtonAdapter as unknown as SDUIComponent,
    spinner: SpinnerAdapter as unknown as SDUIComponent,
    skeleton: SkeletonAdapter as unknown as SDUIComponent,
    empty: EmptyAdapter as unknown as SDUIComponent,
    table: TableAdapter as unknown as SDUIComponent,
    list: ListAdapter as unknown as SDUIComponent,
  };
}

export interface CreateAntdRegistryOptions {
  include?: AntdComponentType[];
}

export function createAntdRegistry(options?: CreateAntdRegistryOptions): ComponentRegistry {
  const map = getComponentMap();
  const include = options?.include ?? ALL_COMPONENTS;
  const initial: Record<string, SDUIComponent> = {};

  for (const type of include) {
    const component = map[type];
    if (component) initial[type] = component;
  }

  return createRegistry(initial);
}

export const antdComponents = getComponentMap();
