import { defineComponent, PropType } from "vue";
import { IProDetailsProps } from "../../types";
import { renderDetailsItem } from "./DetailsItem";

const ProDetails = defineComponent({
  props: {
    columns: Array as PropType<IProDetailsProps["columns"]>,
    dataSource: Object as PropType<IProDetailsProps["dataSource"]>,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const { columns, dataSource, loading } = this.$props;
    return (
      <div class="pro-details">
        <a-skeleton loading={loading} active>
          {columns?.map(({ title, children, ...column }) => (
            <a-descriptions title={title} {...column}>
              {renderDetailsItem(dataSource, children)}
            </a-descriptions>
          ))}
        </a-skeleton>
      </div>
    );
  },
});
export default ProDetails;
