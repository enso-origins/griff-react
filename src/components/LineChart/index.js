import React from 'react';
import PropTypes from 'prop-types';
import { useResizeDetector } from 'react-resize-detector';
import AxisCollection from 'components/AxisCollection';
import ScalerContext from 'context/Scaler';
import ContextChart from 'components/ContextChart';
import GriffPropTypes, {
  areaPropType,
  annotationPropType,
  rulerPropType,
  axisDisplayModeType,
} from 'utils/proptypes';
import LineCollection from 'components/LineCollection';
import InteractionLayer from 'components/InteractionLayer';
import XAxis from 'components/XAxis';
import AxisDisplayMode from 'utils/AxisDisplayMode';
import AxisPlacement from 'components/AxisPlacement';
import { multiFormat } from 'utils/multiFormat';
import Axes from 'utils/Axes';
import { withDisplayName } from 'utils/displayName';
import Layout from './Layout';

const propTypes = {
  // Disable the ESLinter for this because they'll show up from react-sizeme.
  // They'll show up in time, and we set a defaultProp, then react-sizeme
  // doesn't work. So here we go!
  // eslint-disable-next-line react/require-default-props
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  zoomable: PropTypes.bool,
  crosshair: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  // (annotation, x, y) => void
  onClickAnnotation: PropTypes.func,
  // event => void
  onDoubleClick: PropTypes.func,
  // ({ xSubDomain, transformation }) => void
  onZoomXAxis: PropTypes.func,
  xSubDomain: PropTypes.arrayOf(PropTypes.number),
  xAxisHeight: PropTypes.number,
  contextChart: GriffPropTypes.contextChart,
  yAxisTicks: PropTypes.number,
  ruler: rulerPropType,
  annotations: PropTypes.arrayOf(annotationPropType),
  // Number => String
  yAxisFormatter: PropTypes.func,
  xAxisPlacement: GriffPropTypes.axisPlacement,
  yAxisDisplayMode: axisDisplayModeType,
  // (e, seriesId) => void
  onAxisMouseEnter: PropTypes.func,
  // (e, seriesId) => void
  onAxisMouseLeave: PropTypes.func,
  areas: PropTypes.arrayOf(areaPropType),
  /**
   * Pass in a callback function which will be given a defined area when the
   * user creates one. See the definition in proptypes.js for a description of
   * what this object will look like.
   *
   * If this is set, then the chart will not have zooming functionality, because
   * the area definition mechanism (dragging a box with the mouse) conflicts
   * with the panning gesture. If both pieces of functionality are desired, then
   * this should only be set conditionally when the area definition
   * functionality should be enabled.
   */
  // area => null
  onAreaDefined: PropTypes.func,
  // (area, xpos, ypos) => shouldContinue
  onAreaClicked: PropTypes.func,
  pointWidth: PropTypes.number,
  // Number => String
  xAxisFormatter: PropTypes.func,

  yAxisWidth: PropTypes.number,

  // The following props are all supplied by internals (eg, React).
  children: PropTypes.arrayOf(PropTypes.node),
};

const getXAxisHeight = (xAxisHeight, xAxisPlacement) => {
  switch (xAxisPlacement) {
    case AxisPlacement.BOTH:
      return xAxisHeight * 2;
    case AxisPlacement.TOP:
    case AxisPlacement.BOTTOM:
    case AxisPlacement.UNSPECIFIED:
    default:
      return xAxisHeight;
  }
};

const getContextChartHeight = ({
  contextChart,
  xAxisHeight,
  xAxisPlacement,
}) => {
  if (!contextChart || contextChart.visible === false || !contextChart.height) {
    // No context chart to show.
    return 0;
  }

  return getXAxisHeight(xAxisHeight, xAxisPlacement) + contextChart.height;
};

const getYAxisCollectionWidth = (
  placement,
  { collections, series, yAxisDisplayMode, yAxisPlacement, yAxisWidth }
) => {
  const displayModeFilter = mode => item =>
    (item.yAxisDisplayMode || yAxisDisplayMode) === mode;

  const filteredItems = []
    .concat(series)
    .concat(collections)
    .filter(item => {
      const finalYAxisPlacement = item.yAxisPlacement || yAxisPlacement;
      return (
        !item.hidden &&
        item.collectionId === undefined &&
        (finalYAxisPlacement === AxisPlacement.BOTH ||
          finalYAxisPlacement === placement)
      );
    });

  const hasCollapsed =
    filteredItems.filter(displayModeFilter(AxisDisplayMode.COLLAPSED)).length >
    0;

  const isDisplayModeALL = displayModeFilter(AxisDisplayMode.ALL);

  return filteredItems.reduce(
    (totalWidth, item) => {
      if (!isDisplayModeALL(item)) {
        return totalWidth;
      }
      // COLLAPSED items are already accounted-for with the initial value.
      if (item.yAxisDisplayMode === AxisDisplayMode.COLLAPSED) {
        return totalWidth;
      }
      return totalWidth + yAxisWidth;
    },
    hasCollapsed ? yAxisWidth : 0
  );
};

const getYAxisPlacement = ({ collections, series, yAxisPlacement }) => {
  const yAxisPlacements = []
    .concat(series.filter(s => s.collectionId === undefined))
    .concat(collections)
    .reduce((acc, item) => {
      const placement = item.yAxisPlacement || yAxisPlacement;
      if (placement) {
        acc[placement] = (acc[placement] || 0) + 1;
      }
      return acc;
    }, {});
  if (yAxisPlacements[AxisPlacement.BOTH]) {
    return AxisPlacement.BOTH;
  }
  if (
    yAxisPlacements[AxisPlacement.LEFT] &&
    yAxisPlacements[AxisPlacement.RIGHT]
  ) {
    return AxisPlacement.BOTH;
  }
  if (yAxisPlacements[AxisPlacement.LEFT]) {
    return AxisPlacement.LEFT;
  }
  return yAxisPlacement || AxisPlacement.RIGHT;
};

const LineChart = ({
  annotations = [],
  areas = [],
  children = [],
  contextChart = { visible: true, height: 100, isDefault: true },
  crosshair = true,
  height: propHeight = 0,
  onAreaDefined = null,
  onAreaClicked = null,
  onAxisMouseEnter = null,
  onAxisMouseLeave = null,
  onClick = null,
  onZoomXAxis = null,
  onClickAnnotation = null,
  onDoubleClick = null,
  onMouseMove = null,
  onMouseOut = null,
  onBlur = null,
  pointWidth = 6,
  size,
  xSubDomain = [],
  ruler = {
    visible: false,
    timeLabel: () => {},
    yLabel: () => {},
    timestamp: null,
  },
  width: propWidth = 0,
  xAxisHeight = 50,
  xAxisFormatter = multiFormat,
  xAxisPlacement = AxisPlacement.BOTTOM,
  yAxisDisplayMode = AxisDisplayMode.ALL,
  yAxisFormatter = Number,
  yAxisWidth = 50,
  yAxisTicks = null,
  zoomable = true,
  ...props
} = {}) => {
  if (!size) {
    // Can't proceed without a size; just abort until react-sizeme feeds it
    // to the component.
    return null;
  }

  const { width: sizeWidth, height: sizeHeight } = size;

  const width = propWidth || sizeWidth;
  const height = propHeight || sizeHeight;
  const propsForHelpers = {
    ...props,
    contextChart,
    xAxisHeight,
    xAxisPlacement,
    yAxisDisplayMode,
    yAxisWidth,
  };
  const contextChartSpace = getContextChartHeight(propsForHelpers);
  const chartWidth =
    width -
    getYAxisCollectionWidth(AxisPlacement.LEFT, propsForHelpers) -
    getYAxisCollectionWidth(AxisPlacement.RIGHT, propsForHelpers) -
    getYAxisCollectionWidth(undefined, propsForHelpers);
  const chartHeight = height - getXAxisHeight(xAxisHeight) - contextChartSpace;
  const chartSize = {
    width: Math.max(0, chartWidth),
    height: Math.max(0, chartHeight),
  };

  return (
    <Layout
      xAxisPlacement={xAxisPlacement}
      yAxisPlacement={getYAxisPlacement(propsForHelpers)}
      lineChart={
        <svg width={chartSize.width} height={chartSize.height}>
          {React.Children.map(children, child => {
            const childProps = {
              ...chartSize,
              axes: {
                ...(child.props || {}).axes,
                [Axes.x]:
                  ((child.props || {}).axes || {}).x === undefined
                    ? String(Axes.time)
                    : child.props.axes.x,
              },
            };
            return React.cloneElement(child, childProps);
          })}
          <LineCollection
            height={chartSize.height}
            width={chartSize.width}
            pointWidth={pointWidth}
          />
          {// sizeMe can cause chartSize.width to be < 0, which causes
          // problems for the position of the ruler in InteractionLayer
          chartSize.width > 0 && (
            <InteractionLayer
              height={chartSize.height}
              width={chartSize.width}
              crosshair={crosshair}
              onMouseMove={onMouseMove}
              onMouseOut={onMouseOut}
              onBlur={onBlur}
              onClickAnnotation={onClickAnnotation}
              onDoubleClick={onDoubleClick}
              ruler={ruler}
              annotations={annotations}
              onClick={onClick}
              areas={areas}
              onAreaDefined={onAreaDefined}
              onZoomXAxis={onZoomXAxis}
              onAreaClicked={onAreaClicked}
              zoomAxes={{ time: zoomable }}
            />
          )}
        </svg>
      }
      yAxis={
        <AxisCollection
          zoomable={zoomable}
          axisDisplayMode={yAxisDisplayMode}
          onMouseEnter={onAxisMouseEnter}
          onMouseLeave={onAxisMouseLeave}
          height={chartSize.height}
          tickFormatter={yAxisFormatter}
          yAxisWidth={yAxisWidth}
          ticks={yAxisTicks}
        />
      }
      xAxis={
        <XAxis
          width={chartWidth}
          domain={xSubDomain}
          height={xAxisHeight}
          placement={xAxisPlacement}
          tickFormatter={xAxisFormatter}
        />
      }
      contextChart={
        contextChart.visible && (
          <ContextChart
            width={chartWidth}
            height={contextChartSpace}
            zoomable={zoomable}
            annotations={annotations}
            xAxisFormatter={xAxisFormatter}
            xAxisHeight={xAxisHeight}
            xAxisPlacement={xAxisPlacement}
          />
        )
      }
    />
  );
};
LineChart.propTypes = propTypes;
LineChart.defaultProps = {
  annotations: [],
  areas: [],
  children: [],
  contextChart: { visible: true, height: 100, isDefault: true },
  crosshair: true,
  height: 0,
  onAreaDefined: null,
  onAreaClicked: null,
  onAxisMouseEnter: null,
  onAxisMouseLeave: null,
  onClick: null,
  onClickAnnotation: null,
  onDoubleClick: null,
  onMouseMove: null,
  onMouseOut: null,
  onBlur: null,
  onZoomXAxis: null,
  pointWidth: 6,
  ruler: {
    visible: false,
    timeLabel: () => {},
    yLabel: () => {},
    timestamp: null,
  },
  width: 0,
  xAxisFormatter: multiFormat,
  xAxisHeight: 50,
  xAxisPlacement: AxisPlacement.BOTTOM,
  xSubDomain: [],
  yAxisDisplayMode: AxisDisplayMode.ALL,
  yAxisFormatter: Number,
  yAxisTicks: null,
  yAxisWidth: 50,
  zoomable: true,
};

const SizedLineChart = ({ size: explicitSize, ...rest }) => {
  const { ref, width, height } = useResizeDetector();
  const size = explicitSize || { width: width || 0, height: height || 0 };
  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <LineChart {...rest} size={size} />
    </div>
  );
};
SizedLineChart.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};
SizedLineChart.defaultProps = {
  size: undefined,
};

export default withDisplayName('LineChart', props => (
  <ScalerContext.Consumer>
    {({ collections, series }) => (
      <SizedLineChart {...props} collections={collections} series={series} />
    )}
  </ScalerContext.Consumer>
));

export const CustomSizeLineChart = props => (
  <ScalerContext.Consumer>
    {({ collections, series }) => (
      <SizedLineChart {...props} collections={collections} series={series} />
    )}
  </ScalerContext.Consumer>
);
