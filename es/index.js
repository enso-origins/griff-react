import { __extends, __spreadArray, __assign, __rest, __awaiter, __generator } from 'tslib';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useResizeDetector } from 'react-resize-detector';
import { scaleLinear, line, area, curveStepAfter, curveLinear, zoom, select, axisBottom, scaleTime, timeFormat, timeSecond, timeMinute, timeHour, timeDay, timeMonth, timeWeek, timeYear, min, max, extent, axisRight, bisector } from 'd3';
import isEqual$1 from 'lodash.isequal';
import Promise from 'bluebird';

var AXIS_DISPLAY_MODES = {
    ALL: {
        id: 'ALL',
        width: function (axisWidth, numAxes) { return +axisWidth * +numAxes; },
        toString: function () { return 'ALL'; },
    },
    NONE: {
        id: 'NONE',
        width: function () { return 0; },
        toString: function () { return 'NONE'; },
    },
    COLLAPSED: {
        id: 'COLLAPSED',
        width: function (axisWidth, numAxes) {
            if (numAxes === void 0) { numAxes = 0; }
            return Math.min(+numAxes, 1) * +axisWidth;
        },
        toString: function () { return 'COLLAPSED'; },
    },
};

var AXIS_PLACEMENTS = {
    UNSPECIFIED: { id: 0, name: 'UNSPECIFIED', toString: function () { return 'UNSPECIFIED'; } },
    RIGHT: { id: 1, name: 'RIGHT', toString: function () { return 'RIGHT'; } },
    LEFT: { id: 2, name: 'LEFT', toString: function () { return 'LEFT'; } },
    BOTH: { id: 3, name: 'BOTH', toString: function () { return 'BOTH'; } },
    BOTTOM: { id: 4, name: 'BOTTOM', toString: function () { return 'BOTTOM'; } },
    TOP: { id: 5, name: 'TOP', toString: function () { return 'TOP'; } },
};

var Brush = /** @class */ (function (_super) {
    __extends(Brush, _super);
    function Brush() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dragStartOverlay: undefined,
            dragStartSelection: undefined,
            isDraggingHandleEast: false,
            isDraggingHandleWest: false,
            isDraggingOverlay: false,
            isDraggingSelection: false,
        };
        _this.onMouseDownOverlay = function (e) {
            var _a = _this.props.zoomable, zoomable = _a === void 0 ? true : _a;
            if (!zoomable) {
                return;
            }
            _this.setState({
                isDraggingOverlay: true,
                dragStartOverlay: e.nativeEvent.offsetX,
            });
        };
        _this.onMouseDownHandleEast = function () {
            var _a = _this.props.zoomable, zoomable = _a === void 0 ? true : _a;
            if (!zoomable) {
                return;
            }
            _this.setState({
                isDraggingHandleEast: true,
            });
        };
        _this.onMouseDownHandleWest = function () {
            var _a = _this.props.zoomable, zoomable = _a === void 0 ? true : _a;
            if (!zoomable) {
                return;
            }
            _this.setState({
                isDraggingHandleWest: true,
            });
        };
        _this.onMouseDownSelection = function (e) {
            var _a = _this.props.zoomable, zoomable = _a === void 0 ? true : _a;
            if (!zoomable) {
                return;
            }
            _this.setState({
                isDraggingSelection: true,
                dragStartSelection: e.nativeEvent.offsetX,
            });
        };
        _this.onMouseUpSelection = function () {
            var _a = _this.props.zoomable, zoomable = _a === void 0 ? true : _a;
            if (!zoomable) {
                return;
            }
            _this.setState({
                isDraggingSelection: false,
            });
        };
        _this.onMouseUp = function () {
            var _a = _this.props.zoomable, zoomable = _a === void 0 ? true : _a;
            if (!zoomable) {
                return;
            }
            _this.setState({
                isDraggingHandleEast: false,
                isDraggingHandleWest: false,
                isDraggingOverlay: false,
                isDraggingSelection: false,
                dragStartOverlay: undefined,
                dragStartSelection: undefined,
            });
        };
        _this.onMouseMove = function (e) {
            var _a = _this.props, onUpdateSelection = _a.onUpdateSelection, zoomable = _a.zoomable;
            var _b = _this.state, isDraggingHandleEast = _b.isDraggingHandleEast, isDraggingHandleWest = _b.isDraggingHandleWest, isDraggingOverlay = _b.isDraggingOverlay, isDraggingSelection = _b.isDraggingSelection;
            if (!zoomable) {
                return;
            }
            if (isDraggingHandleEast) {
                var position = e.nativeEvent.offsetX;
                var selection = _this.props.selection;
                if (position < selection[0]) {
                    _this.setState({
                        isDraggingHandleEast: false,
                        isDraggingHandleWest: true,
                    });
                    return;
                }
                var newSelection = [selection[0], position];
                onUpdateSelection(newSelection);
            }
            else if (isDraggingHandleWest) {
                var position = e.nativeEvent.offsetX;
                var selection = _this.props.selection;
                if (position > selection[1]) {
                    _this.setState({
                        isDraggingHandleWest: false,
                        isDraggingHandleEast: true,
                    });
                    return;
                }
                var newSelection = [position, selection[1]];
                _this.onUpdateSelection(newSelection);
            }
            else if (isDraggingSelection) {
                var _c = _this.props, selection = _c.selection, width = _c.width;
                var dragStartSelection = _this.state.dragStartSelection;
                var position = e.nativeEvent.offsetX;
                var dx_1 = position - (dragStartSelection || 0);
                var newSelection = selection.map(function (d) { return d + dx_1; });
                if (newSelection[0] >= 0 && newSelection[1] <= width) {
                    _this.setState({
                        dragStartSelection: position,
                    });
                    onUpdateSelection(newSelection);
                }
            }
            else if (isDraggingOverlay) {
                var dragStartOverlay = _this.state.dragStartOverlay;
                var newSelection = [
                    dragStartOverlay || 0,
                    e.nativeEvent.offsetX,
                ].sort(function (a, b) { return a - b; });
                onUpdateSelection(newSelection);
            }
        };
        _this.onUpdateSelection = function (selection) {
            var onUpdateSelection = _this.props.onUpdateSelection;
            onUpdateSelection(selection);
        };
        return _this;
    }
    Brush.prototype.componentDidMount = function () {
        window.addEventListener('mouseup', this.onMouseUp);
    };
    Brush.prototype.componentWillUnmount = function () {
        window.removeEventListener('mouseup', this.onMouseUp);
    };
    Brush.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, selection = _a.selection, _b = _a.handleColor, handleColor = _b === void 0 ? '#333' : _b, _c = _a.selectionColor, selectionColor = _c === void 0 ? 'none' : _c, _d = _a.outsideColor, outsideColor = _d === void 0 ? '#777' : _d, _e = _a.zoomable, zoomable = _e === void 0 ? true : _e, _f = _a.handleWidth, handleWidth = _f === void 0 ? 2 : _f;
        var selectionWidth = selection[1] - selection[0];
        var disabledCursor = zoomable ? null : 'inherit';
        var handleTargetWidth = 10;
        return (jsxs("g", { fill: "none", stroke: "#777", onMouseMove: this.onMouseMove, children: [jsx("rect", { className: "before-selection", fill: outsideColor, fillOpacity: 0.3, stroke: "#fff", shapeRendering: "crispEdges", width: Math.max(0, selection[0]), height: height, x: 0, y: 0 }), jsx("rect", { className: "after-selection", fill: outsideColor, fillOpacity: 0.3, stroke: "#fff", shapeRendering: "crispEdges", width: Math.max(0, width - selection[1]), height: height, x: selection[1], y: 0 }), jsx("rect", { className: "overlay", pointerEvents: "all", cursor: disabledCursor || 'crosshair', x: 0, y: 0, fill: "none", width: width, height: height, onMouseDown: this.onMouseDownOverlay }), jsx("rect", { className: "selection", cursor: disabledCursor || 'move', fill: selectionColor, fillOpacity: 0.3, pointerEvents: "all", shapeRendering: "crispEdges", width: selectionWidth, height: height, x: selection[0], y: 0, onMouseDown: this.onMouseDownSelection }), jsx("path", { className: "handle handle--west", stroke: handleColor, strokeWidth: handleWidth, d: "M ".concat(selection[0], " 0 V ").concat(height) }), jsx("rect", { className: "handle-target handle-target--west", cursor: disabledCursor || 'ew-resize', x: selection[0] - handleTargetWidth / 2, y: 0, width: handleTargetWidth, height: height, fill: "none", pointerEvents: "all", stroke: "none", onMouseDown: this.onMouseDownHandleWest }), jsx("circle", { className: "handle-target handle-target--west", cursor: disabledCursor || 'ew-resize', stroke: handleColor, fill: handleColor, strokeWidth: handleWidth, cx: selection[0] - handleTargetWidth / 2 + 4, cy: height / 4, r: 8, pointerEvents: "all", onMouseDown: this.onMouseDownHandleWest }), jsx("circle", { className: "handle-target handle-target--east", cursor: disabledCursor || 'ew-resize', stroke: handleColor, fill: handleColor, strokeWidth: handleWidth, cx: selection[1] - handleTargetWidth / 2 + 4, cy: height / 4, r: 8, pointerEvents: "all", onMouseDown: this.onMouseDownHandleEast }), jsx("path", { className: "handle handle--east", stroke: handleColor, strokeWidth: handleWidth, d: "M ".concat(selection[1], " 0 V ").concat(height) }), jsx("rect", { className: "handle-target handle-target--east", cursor: disabledCursor || 'ew-resize', x: selection[1] - handleTargetWidth / 2, y: 0, width: handleTargetWidth, height: height, fill: "none", pointerEvents: "all", stroke: "none", onMouseDown: this.onMouseDownHandleEast })] }));
    };
    return Brush;
}(React.Component));

var DataContext = React.createContext({
    series: [],
    collections: [],
    xDomain: [Date.now() - 1000 * 60 * 60 * 24 * 365, 0],
    // eslint-disable-next-line no-console
    registerSeries: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.log.apply(console, __spreadArray(['Fake-registering series:'], args, false));
    },
});

function withDisplayName(displayName, Component) {
    return Object.assign(Component, { displayName: displayName });
}

var WATCHED_PROP_NAMES = [
    'color',
    'drawLines',
    'drawPoints',
    'pointWidth',
    'strokeWidth',
    'hidden',
    'loader',
    'step',
    'zoomable',
    'name',
    'timeAccessor',
    'xAccessor',
    'x0Accessor',
    'x1Accessor',
    'yAccessor',
    'y0Accessor',
    'y1Accessor',
    'yDomain',
    'ySubDomain',
    'yAxisPlacement',
    'yAxisDisplayMode',
    'pointWidthAccessor',
    'opacity',
    'opacityAccessor',
];
var Series = function (_a) {
    var id = _a.id, registerSeries = _a.registerSeries, updateSeries = _a.updateSeries, 
    // Below are all of the series props.
    props = __rest(_a, ["id", "registerSeries", "updateSeries"]);
    // This only happens once, when the component is first mounted.
    React.useEffect(function () {
        return registerSeries(__assign({ id: id }, props));
    }, []);
    // But whenever the component is updated, we want to update the series in the
    // DataProvider.
    React.useEffect(function () {
        return updateSeries(__assign({ id: id }, props));
        // @ts-ignore - It's okay for props[name] to be implicit any.
    }, WATCHED_PROP_NAMES.map(function (name) { return props[name]; }).concat(props.collectionId));
    return null;
};
var Series$1 = withDisplayName('Series', function (props) { return (jsx(DataContext.Consumer, { children: function (_a) {
        var registerSeries = _a.registerSeries, updateSeries = _a.updateSeries;
        return (jsx(Series, __assign({}, props, { registerSeries: registerSeries, updateSeries: updateSeries })));
    } })); });

// @ts-ignore - I don't know how to make TypeScript happy about ...props
var Collection = function (_a) {
    var id = _a.id, registerCollection = _a.registerCollection, updateCollection = _a.updateCollection, children = _a.children, props = __rest(_a, ["id", "registerCollection", "updateCollection", "children"]);
    React.useEffect(function () {
        return registerCollection(__assign({ id: id }, props));
    }, []);
    React.useEffect(function () {
        return updateCollection(__assign({ id: id }, props));
    }, 
    // @ts-ignore - It's okay for props[name] to be implicit any.
    WATCHED_PROP_NAMES.map(function (name) { return props[name]; }));
    if (React.Children.count(children) === 0) {
        return null;
    }
    return React.Children.map(children, function (child) {
        if (!child || !React.isValidElement(child)) {
            return null;
        }
        return React.cloneElement(child, {
            collectionId: id,
        });
    });
};
var Collection$1 = withDisplayName('Collection', function (props) { return (jsx(DataContext.Consumer, { children: function (_a) {
        var registerCollection = _a.registerCollection, updateCollection = _a.updateCollection;
        return (jsx(Collection, __assign({ registerCollection: registerCollection, updateCollection: updateCollection }, props, { children: props.children })));
    } })); });

var ScalerContext = React.createContext({
    series: [],
    collections: [],
    domainsByItemId: {},
    subDomainsByItemId: {},
    updateDomains: function () { return null; },
});

var createYScale = function (domain, height) {
    return scaleLinear()
        .domain(domain)
        .range([height, 0]);
};
var createXScale = function (domain, width) {
    return scaleLinear()
        .domain(domain)
        .range([0, width]);
};

// HTML has an issue with drawing points somewhere in the 30-35M range.
// There's no point in drawing pixels more than 30k pixels outside of the range
// so this hack will work for a while.
// Without this, when zoomed far enough in the line will disappear.
var boundedSeries = function (value) {
    return Math.min(Math.max(value, -30000), 30000);
};

var Points = function (_a) {
    var data = _a.data, _b = _a.drawPoints, drawPoints = _b === void 0 ? false : _b, xAccessor = _a.xAccessor, x0Accessor = _a.x0Accessor, x1Accessor = _a.x1Accessor, yAccessor = _a.yAccessor, y0Accessor = _a.y0Accessor, y1Accessor = _a.y1Accessor, xScale = _a.xScale, yScale = _a.yScale, color = _a.color, _c = _a.opacity, opacity = _c === void 0 ? 1 : _c, opacityAccessor = _a.opacityAccessor, _d = _a.pointFilter, pointFilter = _d === void 0 ? function () { return true; } : _d, pointWidth = _a.pointWidth, pointWidthAccessor = _a.pointWidthAccessor, strokeWidth = _a.strokeWidth;
    if (drawPoints === false) {
        return null;
    }
    var points = data.filter(pointFilter).map(function (d, i, arr) {
        var _a = [xAccessor, x0Accessor, x1Accessor].map(function (func) {
            if (!func) {
                return Number.NaN;
            }
            return +boundedSeries(xScale(func(d, i, arr)));
        }), x = _a[0], x0 = _a[1], x1 = _a[2];
        var _b = [yAccessor, y0Accessor, y1Accessor].map(function (func) {
            if (!func) {
                return Number.NaN;
            }
            return +boundedSeries(yScale(func(d, i, arr)));
        }), y = _b[0], y0 = _b[1], y1 = _b[2];
        var width = 0;
        if (pointWidthAccessor) {
            width = pointWidthAccessor(d, i, arr);
        }
        else if (pointWidth !== undefined && pointWidth !== null) {
            width = pointWidth;
        }
        else if (strokeWidth !== undefined && strokeWidth !== null) {
            width = strokeWidth;
        }
        else {
            width = 6;
        }
        var uiElements = [];
        if (!Number.isNaN(x0) && !Number.isNaN(x1)) {
            uiElements.push(jsx("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: color, strokeWidth: 1 }, "horizontal-".concat(x0, ",").concat(y, "-").concat(x1, ",").concat(y)));
        }
        if (!Number.isNaN(y0) && !Number.isNaN(y1)) {
            uiElements.push(jsx("line", { x1: x, y1: y0, x2: x, y2: y1, stroke: color, strokeWidth: 1 }, "vertical-".concat(x, ",").concat(y0, "-").concat(x, ",").concat(y1)));
        }
        if (!Number.isNaN(x) && !Number.isNaN(y)) {
            uiElements.push(jsx("circle", { className: "point", r: width / 2, opacity: opacityAccessor ? opacityAccessor(d, i, arr) : opacity, cx: x, cy: y, fill: color }, "".concat(x, "-").concat(y)));
        }
        if (typeof drawPoints === 'function') {
            var metadata = {
                x: x,
                y: y,
                x0: x0,
                x1: x1,
                y0: y0,
                y1: y1,
                color: color,
                opacity: opacity,
                opacityAccessor: opacityAccessor,
                pointWidth: pointWidth,
                pointWidthAccessor: pointWidthAccessor,
                strokeWidth: strokeWidth,
            };
            return drawPoints(d, i, arr, metadata, uiElements);
        }
        return uiElements;
    });
    return jsx("g", { children: points });
};

var Line = function (_a) {
    var id = _a.id, data = _a.data, xAxisAccessor = _a.xAxisAccessor, xScale = _a.xScale, yAccessor = _a.yAccessor, y0Accessor = _a.y0Accessor, y1Accessor = _a.y1Accessor, yScale = _a.yScale, _b = _a.color, color = _b === void 0 ? '#000' : _b, _c = _a.step, step = _c === void 0 ? false : _c, _d = _a.hidden, hidden = _d === void 0 ? false : _d, _e = _a.drawPoints, drawPoints = _e === void 0 ? false : _e, _f = _a.strokeWidth, strokeWidth = _f === void 0 ? 1 : _f, _g = _a.opacity, opacity = _g === void 0 ? 1 : _g, opacityAccessor = _a.opacityAccessor, _h = _a.pointWidth, pointWidth = _h === void 0 ? 6 : _h, pointWidthAccessor = _a.pointWidthAccessor, clipPath = _a.clipPath;
    var area$1;
    var curve = step ? curveStepAfter : curveLinear;
    var line$1 = line()
        .curve(curve)
        .x(function (d) {
        return boundedSeries(xScale(xAxisAccessor(
        // @ts-ignore - I'm pretty sure that d3 has the wrong type annotations.
        d)));
    })
        .y(function (d) {
        return boundedSeries(yScale(yAccessor(
        // @ts-ignore - I'm pretty sure that d3 has the wrong type annotations.
        d)));
    });
    if (drawPoints !== true && y0Accessor && y1Accessor) {
        area$1 = area()
            .curve(curve)
            .x(function (d) {
            return boundedSeries(xScale(xAxisAccessor(
            // @ts-ignore - I'm pretty sure that d3 has the wrong type annotations.
            d)));
        })
            .y0(function (d) {
            return boundedSeries(yScale(y0Accessor(
            // @ts-ignore - I'm pretty sure that d3 has the wrong type annotations.
            d)));
        })
            .y1(function (d) {
            return boundedSeries(yScale(y1Accessor(
            // @ts-ignore - I'm pretty sure that d3 has the wrong type annotations.
            d)));
        });
    }
    var circles = null;
    if (drawPoints) {
        var xSubDomain_1 = xScale.domain();
        circles = (jsx(Points, { data: data.filter(function (d) {
                var x = xAxisAccessor(d);
                return x >= xSubDomain_1[0] && x <= xSubDomain_1[1];
            }), opacity: opacity, opacityAccessor: opacityAccessor, drawPoints: drawPoints, xAccessor: xAxisAccessor, yAccessor: yAccessor, xScale: xScale, yScale: yScale, color: color, pointWidth: pointWidth, pointWidthAccessor: pointWidthAccessor }));
    }
    return (jsxs("g", { clipPath: "url(#".concat(clipPath, ")"), children: [area$1 && (jsx("path", { className: "line-area", d: area$1(
                // @ts-ignore - I'm pretty sure that d3 has the wrong type annotations.
                data), style: {
                    stroke: color,
                    strokeOpacity: 0,
                    strokeWidth: "".concat(strokeWidth, "px"),
                    fill: color,
                    fillOpacity: 0.25,
                    opacity: 1,
                    display: hidden ? 'none' : 'inherit',
                } })), jsx("path", { "data-testid": "Line-".concat(id), className: "line", d: line$1(
                // @ts-ignore - I'm pretty sure that d3 has the wrong type annotations.
                data), style: {
                    stroke: color,
                    strokeWidth: "".concat(strokeWidth, "px"),
                    strokeOpacity: opacity,
                    fill: 'none',
                    display: hidden ? 'none' : 'inherit',
                } }), circles] }));
};

/**
 * Provide a placeholder domain so callers can detect unresolved domains while
 * still operating on a valid tuple.
 */
var placeholder = function (min, max) {
    var domain = [min, max];
    domain.placeholder = true;
    return domain;
};

/**
 * Create a {@code Dimension} for a specific {@code DomainDimension}.
 *
 * @param key the {@code Domain} that this {@code Dimension} operates on
 */
var dimension = function (key) {
    var functor = function (input) {
        if (!input) {
            return placeholder(0, 0);
        }
        return input[key];
    };
    functor.toString = function () { return key; };
    return functor;
};
var time = dimension('time');
var x = dimension('x');
var y = dimension('y');
var AXES = {
    /**
     * {@code time} is a reference to the time dimension of the plotted data.
     * Note that not all data necessarily _needs_ to have a time dimension (for
     * example: scatterplots might not have one) but it's required for series
     * which need it, such as a line charts.
     */
    time: time,
    /**
     * {@code x} is the x-dimension of a plotted point. For time series charts,
     * this axis is not used because that data is inherently tied to time, so
     * {@code time = x}. However, for a scatterplot, this is used to determine
     * where the data point will lie along the x axis.
     */
    x: x,
    /**
     * {@code y} is the y-dimension of a plotted point. For time series charts,
     * this will likely be the value of a given point. However, scatterplots will
     * use this to place the point along the y axis (for example, by using the
     * value from another coupled time series).
     */
    y: y,
    HORIZONTAL: [x, time],
    VERTICAL: [y],
    ALL: [time, x, y],
};

var time$1 = AXES.time;
var LineCollection = function (_a) {
    var domainsByItemId = _a.domainsByItemId, subDomainsByItemId = _a.subDomainsByItemId, _b = _a.series, series = _b === void 0 ? new Array() : _b, width = _a.width, height = _a.height, _c = _a.xAxis, xAxis = _c === void 0 ? time$1 : _c, yScalerFactory = _a.yScalerFactory, _d = _a.pointWidth, pointWidth = _d === void 0 ? 6 : _d, _e = _a.scaleX, scaleX = _e === void 0 ? true : _e;
    if (!subDomainsByItemId) {
        return null;
    }
    var clipPath = "clip-path-".concat(width, "-").concat(height, "-").concat(series
        .filter(function (s) { return !s.hidden; })
        .map(function (s) {
        return "".concat(s.id, "-").concat(s.collectionId || 0, "-").concat((s.yAxisDisplayMode || AXIS_DISPLAY_MODES.ALL).id);
    })
        .join('/'));
    var yScaler = yScalerFactory ||
        (function (s, h) {
            return createYScale(AXES.y(subDomainsByItemId[s.collectionId || s.id]), h);
        });
    var lines = series.reduce(function (l, s) {
        if (s.hidden) {
            return l;
        }
        var id = s.id;
        var xScale = createXScale(scaleX ? xAxis(subDomainsByItemId[id]) : xAxis(domainsByItemId[id]), width);
        var yScale = yScaler(s, height);
        return __spreadArray(__spreadArray([], l, true), [
            jsx(Line, __assign({}, s, { xAxisAccessor: xAxis === AXES.time ? s.timeAccessor : s.xAccessor, xScale: xScale, yScale: yScale, clipPath: clipPath, pointWidth: s.pointWidth || pointWidth }), s.id),
        ], false);
    }, new Array());
    return (jsxs("g", { width: width, height: height, children: [jsx("clipPath", { id: clipPath, children: jsx("rect", { width: width, height: height, fill: "none" }) }), lines] }));
};
var LineCollection$1 = withDisplayName('LineCollection', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var domainsByItemId = _a.domainsByItemId, subDomainsByItemId = _a.subDomainsByItemId, series = _a.series;
        return (jsx(LineCollection, __assign({ series: series }, props, { domainsByItemId: domainsByItemId, subDomainsByItemId: subDomainsByItemId })));
    } })); });

var idPropType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
/**
 * If a {@code boolean} is passed, then this will enable (or disable) the
 * default rendering.
 * If a {@code function} is passed, then this will be used as the rendering
 * function for rendering the points.
 *
 * @see {@code drawPoints} on {@link DataProvider} for more information.
 */
var drawPoints = PropTypes.oneOfType([PropTypes.bool, PropTypes.func]);
var singleSeriePropType = PropTypes.shape({
    id: idPropType.isRequired,
    collectionId: idPropType,
    color: PropTypes.string,
    hidden: PropTypes.bool,
    opacity: PropTypes.number,
    strokeWidth: PropTypes.number,
    drawPoints: drawPoints,
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.bool,
    loader: PropTypes.func,
    step: PropTypes.bool,
    xAccessor: PropTypes.func,
    x0Accessor: PropTypes.func,
    x1Accessor: PropTypes.func,
    yAccessor: PropTypes.func,
    y0Accessor: PropTypes.func,
    y1Accessor: PropTypes.func,
    yDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    ySubDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    yAxisDisplayMode: PropTypes.shape({
        // See AxisDisplayMode
        id: PropTypes.string.isRequired,
        width: PropTypes.func.isRequired,
    }),
});
var seriesPropType = PropTypes.arrayOf(singleSeriePropType);
var domainPropType = PropTypes.arrayOf(PropTypes.number.isRequired);
var annotationShape = {
    data: PropTypes.arrayOf(PropTypes.number),
    xScale: PropTypes.func,
    height: PropTypes.number,
    id: PropTypes.number,
    color: PropTypes.string,
    fillOpacity: PropTypes.number,
};
var annotationPropType = PropTypes.shape(annotationShape);
var pointPropType = PropTypes.shape({
    id: idPropType,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
});
// TODO: Do we have any required fields on this?
var dataPointPropType = PropTypes.shape({});
var rulerPropType = PropTypes.shape({
    visible: PropTypes.bool,
    timeLabel: PropTypes.func.isRequired,
    yLabel: PropTypes.func.isRequired,
    // a timestamp representing the initial position of the ruler
    timestamp: PropTypes.number,
    // a function that determines the position of the timestamp
    // (defaultPosition:number, {height:number, toolTipHeight:number, timeLabelMargin:number}) => number
    getTimeLabelPosition: PropTypes.func,
});
var contextChart = PropTypes.shape({
    visible: PropTypes.bool,
    // Height of the chart, *excluding* any axes that are rendered.
    height: PropTypes.number,
});
var axisDisplayModeType = PropTypes.shape({
    // (axisWidth, numAxes) => (width of all of the axes)
    width: PropTypes.func.isRequired,
});
// (domain, [width|height]) => [number, number]
var scalerFactoryFunc = PropTypes.func;
// datapoint => value
var accessorFuncPropType = PropTypes.func;
// value => scaled value
var scaleFuncPropType = PropTypes.func;
var axisPlacement = PropTypes.oneOf(Object.values(AXIS_PLACEMENTS));
var coordinatePropType = PropTypes.shape({
    xval: PropTypes.number,
    yval: PropTypes.number,
    points: PropTypes.arrayOf(pointPropType),
});
var areaPropType = PropTypes.shape({
    id: idPropType,
    seriesId: idPropType,
    color: PropTypes.string,
    xMin: PropTypes.number.isRequired,
    xMax: PropTypes.number.isRequired,
    yMin: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
});
var collection = PropTypes.shape({
    id: idPropType.isRequired,
    // This the color used when referencing the collection (eg, the common axis)
    color: PropTypes.string,
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.bool,
    drawPoints: drawPoints,
    hidden: PropTypes.bool,
    opacity: PropTypes.number,
    strokeWidth: PropTypes.number,
    xAccessor: PropTypes.func,
    yAxisDisplayMode: PropTypes.instanceOf(AXIS_DISPLAY_MODES),
    yAccessor: PropTypes.func,
    y0Accessor: PropTypes.func,
    y1Accessor: PropTypes.func,
    yDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    ySubDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
});
var collections = PropTypes.arrayOf(collection);
var singleSeries = singleSeriePropType;
var multipleSeries = PropTypes.arrayOf(singleSeries);
/**
 * Specification for the grid rendered under the data.
 */
var grid = {
    /** Color of the lines (default: #000) */
    color: PropTypes.string,
    /** Thickness of the lines (default: 1) */
    strokeWidth: PropTypes.number,
    /** Opacity of the lines (default: 0.4) */
    opacity: PropTypes.number,
    /**
     * Defines the behavior of the vertical grid lines (rendered from the X axis)
     */
    x: PropTypes.shape({
        /** Render lines every X pixels */
        pixels: PropTypes.number,
        /**
         * Render this many lines (approximatey). If this is `0`, then the lines
         * will match the tick marks on the x axis.
         */
        count: PropTypes.number,
        /**
         * Color of the lines. If this is not specified, then the top-level color
         * property will be used.
         */
        color: PropTypes.string,
        /**
         * Thickness of the lines. If this is not specified, then the top-level
         * strokeWidth property will be used.
         */
        strokeWidth: PropTypes.number,
        /**
         * Opaccity of the lines. If this is not specified, then the top-level
         * opacity property will be used.
         */
        opacity: PropTypes.number,
    }),
    /**
     * Defines the behavior of the horizontal grid lines (rendered from the Y
     * axis)
     */
    y: PropTypes.shape({
        /** Render lines every X pixels */
        pixels: PropTypes.number,
        /**
         * The series ID to link these lines to for scaling purposes. This way they
         * will be redrawn the y axis is zoomed, translated, etc.
         */
        seriesId: idPropType,
        /**
         * Render this many lines (approximatey). If this is `0`, then the lines
         * will match the tick marks on the x axis.
         */
        count: PropTypes.number,
        /**
         * Color of the lines. If this is `null` (magic value), and `seriesId`
         * points to a series, then that color will be used. However, if `seriesId`
         * is not set, then the top-level color will be used.
         */
        color: PropTypes.string,
        /**
         * Thickness of the lines. If this is not specified, then the top-level
         * strokeWidth property will be used.
         */
        strokeWidth: PropTypes.number,
        /**
         * Opaccity of the lines. If this is not specified, then the top-level
         * opacity property will be used.
         */
        opacity: PropTypes.number,
    }),
};
var updateDomains = PropTypes.func;
var domainsByItemId = PropTypes.objectOf(PropTypes.shape({
    time: domainPropType,
    x: domainPropType,
    y: domainPropType,
}));
var zoomAxes = PropTypes.shape({
    time: PropTypes.bool,
    x: PropTypes.bool,
    y: PropTypes.bool,
});
var axes = PropTypes.oneOf(['time', 'x', 'y']);
var GriffPropTypes = {
    axisPlacement: axisPlacement,
    collection: collection,
    collections: collections,
    contextChart: contextChart,
    drawPoints: drawPoints,
    grid: grid,
    multipleSeries: multipleSeries,
    singleSeries: singleSeries,
    updateDomains: updateDomains,
    domainsByItemId: domainsByItemId,
    subDomainsByItemId: domainsByItemId,
    zoomAxes: zoomAxes,
    axes: axes,
};

var propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    itemIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired).isRequired,
    zoomAxes: PropTypes.shape({
        x: PropTypes.bool,
        y: PropTypes.bool,
        time: PropTypes.bool,
    }).isRequired,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    /**
     * This is a callback which will be called whenever there is a touchmove event
     * with only one touch. This is used to keep the rule in the same x-position
     * (in terms of pixels) on the screen while pans happen by dragging.
     *
     * {@code (offsetX, offsetY) => void}
     */
    // FIXME: Remove this bit and move the business logic to the apps.
    onTouchMove: PropTypes.func,
    onTouchMoveEnd: PropTypes.func,
    // These are provided by Griff.
    updateDomains: GriffPropTypes.updateDomains.isRequired,
    subDomainsByItemId: GriffPropTypes.subDomainsByItemId.isRequired,
};
var defaultProps = {
    onMouseDown: null,
    onMouseUp: null,
    onMouseMove: null,
    onMouseOut: null,
    onClick: null,
    onDoubleClick: null,
    onTouchMove: null,
    onTouchMoveEnd: null,
};
var ZoomRect = /** @class */ (function (_super) {
    __extends(ZoomRect, _super);
    function ZoomRect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onTouchStart = function (event) {
            var _a, _b;
            var touches = event.touches;
            if (touches.length === 1) {
                var touch = touches[0];
                var x = touch.pageX, y = touch.pageY;
                _this.lastTouch = (_a = {},
                    _a[AXES.time] = x,
                    _a[AXES.x] = x,
                    _a[AXES.y] = y,
                    _a);
            }
            else if (touches.length === 2) {
                var touchOne = touches[0], touchTwo = touches[1];
                var _c = _this.getOffset(touchOne), touchOneX = _c.x, touchOneY = _c.y;
                var _d = _this.getOffset(touchTwo), touchTwoX = _d.x, touchTwoY = _d.y;
                _this.lastDeltas = (_b = {},
                    _b[AXES.time] = Math.abs(touchOneX - touchTwoX),
                    _b[AXES.x] = Math.abs(touchOneX - touchTwoX),
                    _b[AXES.y] = Math.abs(touchOneY - touchTwoY),
                    _b);
            }
        };
        // TODO: A lot of this is duplicated with `zoomed` -- maybe they can be
        // consolidated?
        _this.onTouchMove = function (event) {
            var _a;
            var _b = _this.props, width = _b.width, height = _b.height;
            var totalDistances = (_a = {},
                _a[AXES.time] = width,
                _a[AXES.x] = width,
                // height needs to be negated because pixels are measured with 0 at the
                // top, but the axis is rendered with the 0 value at the bottom.
                _a[AXES.y] = -height,
                _a);
            var touches = event.touches;
            var updates = null;
            if (touches.length === 1) {
                // If there was only one touch, then it was a drag event.
                updates = _this.performTouchDrag(touches, totalDistances);
            }
            else if (touches.length === 2) {
                // If there were two, then it is a zoom event.
                updates = _this.performTouchZoom(touches, totalDistances);
            }
            var _c = _this.props, onTouchMove = _c.onTouchMove, updateDomains = _c.updateDomains;
            if (updates) {
                updateDomains(updates);
            }
            if (onTouchMove) {
                onTouchMove();
            }
        };
        _this.onTouchEnd = function (event) {
            var _a;
            var touches = event.touches;
            if (touches.length === 0) {
                _this.lastTouch = null;
            }
            else if (touches.length === 1) {
                _this.lastDeltas = null;
                var touch = touches[0];
                var x = touch.pageX, y = touch.pageY;
                _this.lastTouch = (_a = {},
                    _a[AXES.time] = x,
                    _a[AXES.x] = x,
                    _a[AXES.y] = y,
                    _a);
            }
            var onTouchMoveEnd = _this.props.onTouchMoveEnd;
            if (onTouchMoveEnd) {
                onTouchMoveEnd();
            }
        };
        _this.getOffset = function (_a) {
            var pageX = _a.pageX, pageY = _a.pageY;
            var _b = _this.zoomNode.getBoundingClientRect(), boundingX = _b.x, boundingY = _b.y;
            return {
                x: pageX - boundingX,
                y: pageY - boundingY,
            };
        };
        _this.performTouchDrag = function (touches, totalDistances) {
            var _a;
            var _b = _this.props, itemIds = _b.itemIds, subDomainsByItemId = _b.subDomainsByItemId, zoomAxes = _b.zoomAxes;
            var touch = touches[0];
            var newTouchPosition = (_a = {},
                _a[AXES.time] = touch.pageX,
                _a[AXES.x] = touch.pageX,
                _a[AXES.y] = touch.pageY,
                _a);
            var updates = {};
            itemIds.forEach(function (itemId) {
                updates[itemId] = {};
                AXES.ALL.filter(function (axis) { return zoomAxes[axis]; }).forEach(function (axis) {
                    var subDomain = (subDomainsByItemId[itemId] || {})[axis];
                    var subDomainRange = subDomain[1] - subDomain[0];
                    var newSubDomain = null;
                    var percentMovement = subDomainRange *
                        ((_this.lastTouch[axis] - newTouchPosition[axis]) /
                            totalDistances[axis]);
                    newSubDomain = subDomain.map(function (bound) { return bound + percentMovement; });
                    if (newSubDomain) {
                        updates[itemId][axis] = newSubDomain;
                    }
                });
            });
            _this.lastTouch = __assign({}, newTouchPosition);
            return updates;
        };
        _this.performTouchZoom = function (touches, totalDistances) {
            var _a, _b, _c, _d;
            var _e = _this.props, itemIds = _e.itemIds, subDomainsByItemId = _e.subDomainsByItemId, zoomAxes = _e.zoomAxes, width = _e.width, height = _e.height;
            var touchOne = touches[0], touchTwo = touches[1];
            var _f = _this.getOffset(touchOne), touchOneX = _f.x, touchOneY = _f.y;
            var _g = _this.getOffset(touchTwo), touchTwoX = _g.x, touchTwoY = _g.y;
            var centers = (_a = {},
                _a[AXES.time] = (touchOneX + touchTwoX) / 2,
                _a[AXES.x] = (touchOneX + touchTwoX) / 2,
                _a[AXES.y] = (touchOneY + touchTwoY) / 2,
                _a);
            var deltas = (_b = {},
                _b[AXES.time] = Math.abs(touchOneX - touchTwoX),
                _b[AXES.x] = Math.abs(touchOneX - touchTwoX),
                _b[AXES.y] = Math.abs(touchOneY - touchTwoY),
                _b);
            // These are used to multiply the zoomFactor in each direction. These need
            // to be treated separately because height is measured inverted from width.
            // That is, a point lower on the screen (touching a lower axis value) has a
            // higher Y pixel value than a point above it (one which is touching a
            // higher axis value). Conversely, points along the time and x axes have
            // x values which match the direction of the pixel values.
            // The inversion (or lack thereof) needs to happen because when the
            // distance between the fingers decreases, we want the subdomain to increase
            // so the value needs to be inverted. (Phew!)
            var multipliers = (_c = {},
                _c[AXES.time] = -1,
                _c[AXES.x] = -1,
                _c[AXES.y] = 1,
                _c);
            // This is almost the same as the `totalDistances` object, except the height
            // is un-inverted for y axis.
            var measurements = (_d = {},
                _d[AXES.time] = width,
                _d[AXES.x] = width,
                _d[AXES.y] = height,
                _d);
            var updates = {};
            itemIds.forEach(function (itemId) {
                updates[itemId] = {};
                AXES.ALL.filter(function (axis) { return zoomAxes[axis] && _this.lastDeltas[axis]; }).forEach(function (axis) {
                    var subDomain = (subDomainsByItemId[itemId] || {})[axis];
                    var subDomainRange = subDomain[1] - subDomain[0];
                    var percentFromEnd = centers[axis] / measurements[axis];
                    var zoomFactor = multipliers[axis] *
                        ((deltas[axis] - _this.lastDeltas[axis]) / totalDistances[axis]);
                    // Figure out the value on the scale where the mouse is so that the
                    // new subdomain does not shift.
                    var valueAtCenter = subDomain[0] + subDomainRange * percentFromEnd;
                    // How big the next subdomain is going to be
                    var newSpan = subDomainRange * (1 + zoomFactor);
                    // Finally, place this new span into the subdomain, centered about the
                    // mouse, and correctly (proportionately) split above & below so that
                    // theaxis is stable.
                    var start = valueAtCenter - newSpan * percentFromEnd;
                    var end = valueAtCenter + newSpan * (1 - percentFromEnd);
                    updates[itemId][axis] = [Math.min(start, end), Math.max(end, start)];
                });
            });
            _this.lastDeltas = __assign({}, deltas);
            return updates;
        };
        _this.syncZoomingState = function () {
            var zoomAxes = _this.props.zoomAxes;
            if (Object.keys(zoomAxes).find(function (axis) { return zoomAxes[axis]; })) {
                _this.rectSelection.on('touchend', function (event) { return _this.onTouchEnd(event); }, true);
                _this.rectSelection.on('touchmove', function (event) { return _this.onTouchMove(event); }, true);
                _this.rectSelection.on('touchstart', function (event) { return _this.onTouchStart(event); }, true);
                _this.rectSelection.call(_this.zoom.on('zoom', function (event) { return _this.zoomed(event); }));
                _this.rectSelection.on('dblclick.zoom', null);
            }
            else {
                _this.rectSelection.on('.zoom', null);
            }
        };
        /**
         * {@link #zoomed()} is called when D3 is handling the zoom -- such as with
         * a pointing device. However, {@link #onTouchMove()} is used to handle events
         * with touch sources (such as fingers on a touchscreen).
         */
        _this.zoomed = function (event) {
            var _a, _b, _c;
            var _d = _this.props, zoomAxes = _d.zoomAxes, itemIds = _d.itemIds, width = _d.width, height = _d.height;
            var sourceEvent = event.sourceEvent;
            var totalDistances = (_a = {},
                _a[AXES.time] = width,
                _a[AXES.x] = width,
                _a[AXES.y] = height,
                _a);
            var movements = (_b = {},
                _b[AXES.time] = -sourceEvent.movementX,
                _b[AXES.x] = -sourceEvent.movementX,
                _b[AXES.y] = sourceEvent.movementY,
                _b);
            var percents = (_c = {},
                _c[AXES.time] = sourceEvent.offsetX / width,
                _c[AXES.x] = sourceEvent.offsetX / width,
                // Invert the event coordinates for sanity, since they're measured from
                // the top-left, but we want to go from the bottom-left.
                _c[AXES.y] = (height - sourceEvent.offsetY) / height,
                _c);
            var updates = {};
            var _e = _this.props, subDomainsByItemId = _e.subDomainsByItemId, updateDomains = _e.updateDomains;
            itemIds.forEach(function (itemId) {
                updates[itemId] = {};
                AXES.ALL.filter(function (axis) { return zoomAxes[axis]; }).forEach(function (axis) {
                    var subDomain = (subDomainsByItemId[itemId] || {})[axis];
                    var subDomainRange = subDomain[1] - subDomain[0];
                    var newSubDomain = null;
                    if (sourceEvent.deltaY) {
                        // This is a zoom event.
                        var deltaMode = sourceEvent.deltaMode, deltaY = sourceEvent.deltaY;
                        var percentFromEnd = percents[axis];
                        // This was borrowed from d3-zoom.
                        var zoomFactor = (deltaY * (deltaMode ? 120 : 1)) / 500;
                        // Figure out the value on the scale where the mouse is so that the
                        // new subdomain does not shift.
                        var valueAtMouse = subDomain[0] + subDomainRange * percentFromEnd;
                        // How big the next subdomain is going to be
                        var newSpan = subDomainRange * (1 + zoomFactor);
                        // Finally, place this new span into the subdomain, centered about the
                        // mouse, and correctly (proportionately) split above & below so that
                        // the axis is stable.
                        var start = valueAtMouse - newSpan * percentFromEnd;
                        var end = valueAtMouse + newSpan * (1 - percentFromEnd);
                        newSubDomain = [Math.min(start, end), Math.max(end, start)];
                    }
                    else if (movements[axis]) {
                        // This is a drag event.
                        var percentMovement_1 = subDomainRange * (movements[axis] / totalDistances[axis]);
                        newSubDomain = subDomain.map(function (bound) { return bound + percentMovement_1; });
                    }
                    if (newSubDomain) {
                        updates[itemId][axis] = newSubDomain;
                    }
                });
            });
            updateDomains(updates);
        };
        return _this;
    }
    ZoomRect.prototype.componentDidMount = function () {
        var _a = this.props, width = _a.width, height = _a.height;
        this.zoom = zoom()
            .translateExtent([
            [0, 0],
            [width, height],
        ])
            .extent([
            [0, 0],
            [width, height],
        ]);
        this.rectSelection = select(this.zoomNode);
        this.syncZoomingState();
    };
    ZoomRect.prototype.componentDidUpdate = function (prevProps) {
        var prevZoomAxes = prevProps.zoomAxes;
        var currZoomAxes = this.props.zoomAxes;
        if (!isEqual$1(prevZoomAxes, currZoomAxes)) {
            this.syncZoomingState();
        }
    };
    ZoomRect.prototype.render = function () {
        var _this = this;
        var _a = this.props, width = _a.width, height = _a.height, onClick = _a.onClick, onMouseMove = _a.onMouseMove, onMouseOut = _a.onMouseOut, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, onDoubleClick = _a.onDoubleClick;
        return (jsx("rect", { ref: function (ref) {
                _this.zoomNode = ref;
            }, pointerEvents: "all", fill: "none", width: width, height: height, onClick: onClick, onMouseMove: onMouseMove, onBlur: onMouseMove, onMouseOut: onMouseOut, onMouseDown: onMouseDown, onMouseUp: onMouseUp, onDoubleClick: onDoubleClick }));
    };
    return ZoomRect;
}(React.Component));
ZoomRect.propTypes = propTypes;
ZoomRect.defaultProps = defaultProps;
var ZoomRect$1 = withDisplayName('ZoomRect', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var domainsByItemId = _a.domainsByItemId, subDomainsByItemId = _a.subDomainsByItemId, updateDomains = _a.updateDomains;
        return (jsx(ZoomRect, __assign({}, props, { domainsByItemId: domainsByItemId, subDomainsByItemId: subDomainsByItemId, updateDomains: updateDomains })));
    } })); });

var tickTransformer = function (v) { return "translate(".concat(v, ", 0)"); };
/**
 * This is only used for rendering the ticks on the x-axis when it is used to
 * render time. Everywhere else in the library, {@link createXScale} should be
 * used to create scales.
 *
 * @param {number[]} domain
 * @param {number} width
 */
var createTimeScale = function (domain, width) {
    return scaleTime()
        .domain(domain)
        .range([0, width]);
};
var X_SCALER_FACTORY = {
    time: createTimeScale,
    x: createXScale,
};
var getLineProps = function (_a) {
    var tickSizeInner = _a.tickSizeInner, strokeWidth = _a.strokeWidth, height = _a.height, placement = _a.placement;
    switch (placement) {
        case AXIS_PLACEMENTS.TOP:
            return {
                x1: strokeWidth / 2,
                x2: strokeWidth / 2,
                y1: height - tickSizeInner,
                y2: height,
            };
        case AXIS_PLACEMENTS.BOTTOM:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return {
                x1: strokeWidth / 2,
                x2: strokeWidth / 2,
                y2: tickSizeInner,
            };
    }
};
var getPathString = function (_a) {
    var height = _a.height, placement = _a.placement, range = _a.range, strokeWidth = _a.strokeWidth, tickSizeOuter = _a.tickSizeOuter;
    switch (placement) {
        case AXIS_PLACEMENTS.TOP:
            return [
                "M".concat(range[0], ",").concat(height - tickSizeOuter),
                "V".concat(height - strokeWidth / 2),
                "H".concat(range[1] - strokeWidth),
                "V".concat(height - tickSizeOuter),
            ].join('');
        case AXIS_PLACEMENTS.BOTTOM:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return [
                "M".concat(range[0], ",").concat(tickSizeOuter),
                "V".concat(strokeWidth / 2),
                "H".concat(range[1] - strokeWidth),
                "V".concat(tickSizeOuter),
            ].join('');
    }
};
var getTextProps = function (_a) {
    var height = _a.height, placement = _a.placement, strokeWidth = _a.strokeWidth, tickPadding = _a.tickPadding, tickSizeInner = _a.tickSizeInner;
    switch (placement) {
        case AXIS_PLACEMENTS.TOP:
            return {
                y: height - (Math.max(tickSizeInner, 0) + tickPadding) - 10,
                x: strokeWidth / 2,
            };
        case AXIS_PLACEMENTS.BOTTOM:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return {
                y: Math.max(tickSizeInner, 0) + tickPadding,
                x: strokeWidth / 2,
            };
    }
};
var XAxis = function (_a) {
    var _b;
    var _c = _a.axis, a = _c === void 0 ? 'time' : _c, domainsByItemId = _a.domainsByItemId, _d = _a.height, height = _d === void 0 ? 50 : _d, _e = _a.placement, placement = _e === void 0 ? AXIS_PLACEMENTS.BOTTOM : _e, _f = _a.scaled, scaled = _f === void 0 ? true : _f, series = _a.series, _g = _a.stroke, stroke = _g === void 0 ? 'black' : _g, subDomainsByItemId = _a.subDomainsByItemId, _h = _a.tickFormatter, tickFormatter = _h === void 0 ? function (x) { return Number(x).toString(); } : _h, _j = _a.ticks, ticks = _j === void 0 ? 0 : _j, _k = _a.width, width = _k === void 0 ? 1 : _k;
    if (series.length === 0) {
        return null;
    }
    // TODO: Update this to be multi-series aware. Right now this assumes one
    // single x axis, which isn't scalable.
    var domain = (scaled ? subDomainsByItemId : domainsByItemId)[series[0].id];
    // The system hasn't fully booted-up yet (domains / subdomains are still being
    // calculated and populated), so we need to wait a heartbeat.
    if (!domain) {
        return null;
    }
    // @ts-ignore - I think that TypeScript is wrong here because nothing here
    // will be void .. ?
    var scale = X_SCALER_FACTORY[a](domain[a], width);
    var axis = axisBottom(scale);
    var tickFontSize = 14;
    var strokeWidth = 2;
    var halfStrokeWidth = strokeWidth / 2;
    var tickSizeOuter = axis.tickSizeOuter();
    var tickSizeInner = axis.tickSizeInner();
    var tickPadding = axis.tickPadding();
    // In order to reduce label overlapping for smaller devices
    // we want to adjust amount of ticks depending on width.
    // Default amount of ticks is 10 which is sutable for a
    // regular 1280 display. So by dividing width by ~100
    // we can achieve appropriate amount of ticks for any width.
    var values = scale.ticks(ticks || Math.floor(width / 100) || 1);
    var range = scale.range().map(function (r) { return r + halfStrokeWidth; });
    var pathString = getPathString({
        height: height,
        placement: placement,
        range: range,
        strokeWidth: strokeWidth,
        tickSizeOuter: tickSizeOuter,
    });
    var textProps = __assign({ fill: stroke, dy: '0.71em' }, getTextProps({
        height: height,
        placement: placement,
        strokeWidth: strokeWidth,
        tickPadding: tickPadding,
        tickSizeInner: tickSizeInner,
    }));
    var axisElement = (jsxs("g", { "data-testid": "xAxis", className: "axis x-axis", fill: "none", fontSize: tickFontSize, textAnchor: "middle", strokeWidth: strokeWidth, children: [jsx("path", { stroke: stroke, d: pathString }), values.map(function (v) {
                var lineProps = __assign({ stroke: stroke }, getLineProps({
                    height: height,
                    placement: placement,
                    strokeWidth: strokeWidth,
                    tickSizeInner: tickSizeInner,
                }));
                return (jsxs("g", { opacity: 1, transform: tickTransformer(scale(v)), children: [jsx("line", __assign({ stroke: stroke }, lineProps)), jsx("text", __assign({ className: "tick-value" }, textProps, { children: tickFormatter(+v, values) }))] }, +v));
            })] }));
    return (jsxs("svg", { width: width, style: { width: '100%', display: 'block' }, height: height, children: [axisElement, jsx(ZoomRect$1, { width: width, height: height, itemIds: series.filter(function (s) { return !s.hidden; }).map(function (s) { return s.id; }), zoomAxes: (_b = {}, _b[a] = true, _b) })] }));
};
var SizedXAxis = function (props) {
    var _a = useResizeDetector(), ref = _a.ref, width = _a.width;
    return (jsx("div", { ref: ref, style: { width: '100%' }, children: jsx(XAxis, __assign({}, props, { width: props.width !== undefined ? props.width : width || undefined })) }));
};
var XAxis$1 = withDisplayName('XAxis', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var domainsByItemId = _a.domainsByItemId, subDomainsByItemId = _a.subDomainsByItemId, series = _a.series;
        return (jsx(SizedXAxis, __assign({ series: series }, props, { domainsByItemId: domainsByItemId, subDomainsByItemId: subDomainsByItemId })));
    } })); });

var Annotation = function (_a) {
    var data = _a.data, xScale = _a.xScale, height = _a.height, _b = _a.color, color = _b === void 0 ? '#e8336d' : _b, _c = _a.fillOpacity, fillOpacity = _c === void 0 ? 0.1 : _c, id = _a.id;
    return (jsx("rect", { className: "griff-annotation griff-annotation-".concat(id), x: xScale(data[0]), y: 0, height: height, width: xScale(data[1]) - xScale(data[0]), style: { stroke: color, fill: color, fillOpacity: fillOpacity } }, id));
};

var formatMillisecond = timeFormat('.%L');
var formatSecond = timeFormat(':%S');
var formatMinute = timeFormat('%H:%M');
var formatHour = timeFormat('%H:00');
var formatDay = timeFormat('%d/%m');
var formatWeek = timeFormat('%d/%m');
var formatMonth = timeFormat('%d/%m');
var formatYear = timeFormat('%b %Y');
/* eslint-disable no-nested-ternary */
var multiFormat = function (date) {
    return (timeSecond(date) < date
        ? formatMillisecond
        : timeMinute(date) < date
            ? formatSecond
            : timeHour(date) < date
                ? formatMinute
                : timeDay(date) < date
                    ? formatHour
                    : timeMonth(date) < date
                        ? timeWeek(date) < date
                            ? formatDay
                            : formatWeek
                        : timeYear(date) < date
                            ? formatMonth
                            : formatYear)(date);
};

// If the timeSubDomain is within this margin, consider it to be attached to
// the leading edge of the timeDomain.
var FRONT_OF_WINDOW_THRESHOLD = 0.05;
var haveDomainsChanged = function (before, after) {
    return !isEqual(before.timeDomain, after.timeDomain) ||
        !isEqual(before.timeSubDomain, after.timeSubDomain) ||
        !isEqual(before.xDomain, after.xDomain) ||
        !isEqual(before.xSubDomain, after.xSubDomain) ||
        !isEqual(before.yDomain, after.yDomain) ||
        !isEqual(before.ySubDomain, after.ySubDomain);
};
var findItemsWithChangedDomains = function (previousItems, currentItems) {
    var previousItemsById = previousItems.reduce(function (acc, s) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[s.id] = s, _a)));
    }, {});
    return currentItems.reduce(function (acc, s) {
        if (!previousItemsById[s.id] ||
            haveDomainsChanged(previousItemsById[s.id], s)) {
            return __spreadArray(__spreadArray([], acc, true), [s], false);
        }
        return acc;
    }, []);
};
var isEqual = function (a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    return a[0] === b[0] && a[1] === b[1];
};
var firstResolvedDomain = function (domain) {
    // tslint:disable-next-line
    var domains = [];
    for (
    // tslint:disable-next-line
    var _i = 1; 
    // tslint:disable-next-line
    _i < arguments.length; 
    // tslint:disable-next-line
    _i++) {
        // tslint:disable-next-line
        domains[_i - 1] = arguments[_i];
    }
    if (domain && domain.placeholder !== true) {
        return __spreadArray([], domain, true);
    }
    if (domains.length === 0) {
        return undefined;
    }
    return firstResolvedDomain.apply(void 0, __spreadArray([domains[0]], domains.splice(1), false));
};
/**
 * The scaler is the source of truth for all things related to the domains and
 * subdomains for all of the items within Griff. Note that an item can be either
 * a series or a collection, and domains are flexible. As of this writing, there
 * are three axes:
 *   time: The timestamp of a datapoint
 *   x: The x-value of a datapoint
 *   y: The y-value of a datapoint.
 *
 * These axes all have separate domains and subdomains. The domain is the range
 * of that axis, and the subdomain is the currently-visible region of that
 * range.
 *
 * These are manipulated with the {@link #updateDomains} function, which is
 * made available through the {@link ScalerContext}.
 */
var Scaler = /** @class */ (function (_super) {
    __extends(Scaler, _super);
    function Scaler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            domainsByItemId: {},
            subDomainsByItemId: {},
        };
        /**
         * Update the subdomains for the given items. This is a patch update and will
         * be merged with the current state of the subdomains. An example payload
         * will resemble:
         * <code>
         *   {
         *     "series-1": {
         *       "y": [0.5, 0.75],
         *     },
         *     "series-2": {
         *       "y": [1.0, 2.0],
         *     }
         *   }
         * </code>
         *
         * After this is complete, {@code callback} will be called with this patch
         * object.
         */
        _this.updateDomains = function (changedDomainsById, callback) {
            // FIXME: This is not multi-series aware.
            var newTimeSubDomain = null;
            var dataContext = _this.props.dataContext;
            var _a = _this.state, domainsByItemId = _a.domainsByItemId, subDomainsByItemId = _a.subDomainsByItemId;
            var newSubDomains = __assign({}, subDomainsByItemId);
            Object.keys(changedDomainsById).forEach(function (itemId) {
                newSubDomains[itemId] = __assign({}, (subDomainsByItemId[itemId] || {}));
                Object.keys(changedDomainsById[itemId]).forEach(function (uncastAxis) {
                    var axis = uncastAxis;
                    var newSubDomain = changedDomainsById[itemId][axis];
                    if (axis === String(AXES.time)) {
                        if (dataContext.limitTimeSubDomain) {
                            newSubDomain = dataContext.limitTimeSubDomain(newSubDomain);
                        }
                    }
                    var newSpan = newSubDomain[1] - newSubDomain[0];
                    var existingSubDomain = subDomainsByItemId[itemId][axis] || newSubDomain;
                    var existingSpan = existingSubDomain[1] - existingSubDomain[0];
                    var limits = firstResolvedDomain(((domainsByItemId || {})[itemId] || {})[axis], axis === String(AXES.time)
                        ? // FIXME: Phase out this single timeDomain thing.
                            dataContext.timeDomain
                        : undefined) ||
                        // Set a large range because this is a limiting range.
                        placeholder(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
                    if (newSpan === existingSpan) {
                        // This is a translation; check the bounds.
                        if (newSubDomain[0] <= limits[0]) {
                            newSubDomain = [limits[0], limits[0] + newSpan];
                        }
                        if (newSubDomain[1] >= limits[1]) {
                            newSubDomain = [limits[1] - newSpan, limits[1]];
                        }
                    }
                    else {
                        newSubDomain = [
                            Math.max(limits[0], newSubDomain[0]),
                            Math.min(limits[1], newSubDomain[1]),
                        ];
                    }
                    newSubDomains[itemId][axis] = newSubDomain;
                    if (axis === String(AXES.time)) {
                        newTimeSubDomain = newSubDomain;
                    }
                });
            });
            // expose newSubDomains to DataProvider
            if (dataContext.onUpdateDomains) {
                dataContext.onUpdateDomains(newSubDomains);
            }
            _this.setState({ subDomainsByItemId: newSubDomains }, callback ? function () { return callback(changedDomainsById); } : undefined);
            if (newTimeSubDomain) {
                dataContext.timeSubDomainChanged(newTimeSubDomain);
            }
        };
        return _this;
    }
    Scaler.getDerivedStateFromProps = function (_a, state) {
        var _b = _a.dataContext, timeDomain = _b.timeDomain, timeSubDomain = _b.timeSubDomain, series = _b.series, collections = _b.collections;
        // Make sure that all items in the props are present in the domainsByItemId
        // and subDomainsByItemId state objects.
        var domainsByItemId = state.domainsByItemId, subDomainsByItemId = state.subDomainsByItemId;
        var updated = false;
        var stateUpdates = series.concat(collections).reduce(function (acc, item) {
            var _a, _b;
            var updates = __assign({}, acc);
            if (!domainsByItemId[item.id]) {
                updated = true;
                updates.domainsByItemId = __assign(__assign({}, updates.domainsByItemId), (_a = {}, _a[item.id] = {
                    time: __spreadArray([], timeDomain, true),
                    x: firstResolvedDomain(item.xDomain) ||
                        placeholder(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
                    y: firstResolvedDomain(item.yDomain) ||
                        placeholder(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
                }, _a));
            }
            if (!subDomainsByItemId[item.id]) {
                updated = true;
                updates.subDomainsByItemId = __assign(__assign({}, updates.subDomainsByItemId), (_b = {}, _b[item.id] = {
                    time: __spreadArray([], timeSubDomain, true),
                    x: firstResolvedDomain(item.xSubDomain) || placeholder(0, 1),
                    y: firstResolvedDomain(item.ySubDomain) || placeholder(0, 1),
                }, _b));
            }
            return updates;
        }, { domainsByItemId: domainsByItemId, subDomainsByItemId: subDomainsByItemId });
        return updated ? stateUpdates : null;
    };
    Scaler.prototype.componentDidUpdate = function (prevProps) {
        var dataContext = this.props.dataContext;
        var _a = this.state, oldDomainsByItemId = _a.domainsByItemId, oldSubDomainsByItemId = _a.subDomainsByItemId;
        var changedSeries = findItemsWithChangedDomains(prevProps.dataContext.series, dataContext.series);
        var changedCollections = findItemsWithChangedDomains(prevProps.dataContext.collections, dataContext.collections);
        if (changedSeries.length > 0 || changedCollections.length > 0) {
            var domainsByItemId_1 = __assign({}, oldDomainsByItemId);
            var subDomainsByItemId_1 = __assign({}, oldSubDomainsByItemId);
            __spreadArray(__spreadArray([], changedSeries, true), changedCollections, true).forEach(function (item) {
                domainsByItemId_1[item.id] = {
                    time: firstResolvedDomain(dataContext.timeDomain, item.timeDomain, AXES.time(oldDomainsByItemId[item.id])) || placeholder(0, Date.now()),
                    x: firstResolvedDomain(item.xDomain, AXES.x(oldDomainsByItemId[item.id])) ||
                        // Set a large range because this is a domain.
                        placeholder(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
                    y: firstResolvedDomain(item.yDomain, AXES.y(oldDomainsByItemId[item.id])) ||
                        // Set a large range because this is a domain.
                        placeholder(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
                };
                subDomainsByItemId_1[item.id] = {
                    time: firstResolvedDomain(dataContext.timeSubDomain ||
                        item.timeSubDomain ||
                        AXES.time(oldSubDomainsByItemId[item.id])) ||
                        // Set a large range because this is a subdomain.
                        placeholder(0, Date.now()),
                    x: firstResolvedDomain(item.xSubDomain, AXES.x(oldSubDomainsByItemId[item.id])) ||
                        // Set a small range because this is a subdomain.
                        placeholder(0, 1),
                    y: firstResolvedDomain(item.ySubDomain || AXES.y(oldSubDomainsByItemId[item.id])) ||
                        // Set a small range because this is a subdomain.
                        placeholder(0, 1),
                };
            });
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ subDomainsByItemId: subDomainsByItemId_1, domainsByItemId: domainsByItemId_1 });
            return;
        }
        if (!isEqual(prevProps.dataContext.timeDomain, dataContext.timeDomain)) {
            var prevTimeDomain_1 = prevProps.dataContext.timeDomain;
            var nextTimeDomain_1 = dataContext.timeDomain;
            // When timeDomain changes, we need to update everything downstream.
            var domainsByItemId_2 = __assign({}, oldDomainsByItemId);
            Object.keys(domainsByItemId_2).forEach(function (itemId) {
                domainsByItemId_2[itemId].time = nextTimeDomain_1;
            });
            var subDomainsByItemId_2 = __assign({}, oldSubDomainsByItemId);
            Object.keys(subDomainsByItemId_2).forEach(function (itemId) {
                var timeSubDomain = oldSubDomainsByItemId[itemId].time;
                subDomainsByItemId_2[itemId] = __assign({}, oldSubDomainsByItemId[itemId]);
                var dt = timeSubDomain[1] - timeSubDomain[0];
                if (Math.abs((timeSubDomain[1] - prevTimeDomain_1[1]) / dt) <=
                    FRONT_OF_WINDOW_THRESHOLD) {
                    // Looking at the front of the window -- continue to track that.
                    subDomainsByItemId_2[itemId].time = [
                        nextTimeDomain_1[1] - dt,
                        nextTimeDomain_1[1],
                    ];
                }
                else if (timeSubDomain[0] <= prevTimeDomain_1[0]) {
                    // Looking at the back of the window -- continue to track that.
                    subDomainsByItemId_2[itemId].time = [
                        prevTimeDomain_1[0],
                        prevTimeDomain_1[0] + dt,
                    ];
                }
            });
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ domainsByItemId: domainsByItemId_2, subDomainsByItemId: subDomainsByItemId_2 });
        }
        if (!isEqual(prevProps.dataContext.timeSubDomain, dataContext.timeSubDomain)) {
            // When timeSubDomain changes, we need to update everything downstream.
            var newSubDomainsByItemId_1 = {};
            Object.keys(oldSubDomainsByItemId).forEach(function (itemId) {
                newSubDomainsByItemId_1[itemId] = __assign(__assign({}, oldSubDomainsByItemId[itemId]), { time: dataContext.timeSubDomain });
            });
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ subDomainsByItemId: newSubDomainsByItemId_1 });
        }
    };
    Scaler.prototype.render = function () {
        var _a = this.state, domainsByItemId = _a.domainsByItemId, subDomainsByItemId = _a.subDomainsByItemId;
        var _b = this.props, children = _b.children, _c = _b.dataContext, collections = _c.collections, series = _c.series;
        var finalContext = {
            // Pick what we need out of the dataContext instead of spreading the
            // entire object into the context.
            collections: collections,
            series: series,
            updateDomains: this.updateDomains,
            domainsByItemId: domainsByItemId,
            subDomainsByItemId: subDomainsByItemId,
        };
        return (jsx(ScalerContext.Provider, { value: finalContext, children: children }));
    };
    // eslint-disable-next-line react/static-property-placement
    Scaler.propTypes = {
        children: PropTypes.node.isRequired,
        dataContext: PropTypes.shape({
            timeDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
            timeSubDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
            timeSubDomainChanged: PropTypes.func.isRequired,
            limitTimeSubDomain: PropTypes.func,
            externalXSubDomain: PropTypes.arrayOf(PropTypes.number),
            series: seriesPropType.isRequired,
            collections: GriffPropTypes.collections.isRequired,
        }).isRequired,
    };
    // eslint-disable-next-line react/static-property-placement
    Scaler.defaultProps = {};
    return Scaler;
}(React.Component));
var Scaler$1 = withDisplayName('Scaler', function (props) { return (jsx(DataContext.Consumer, { children: function (dataContext) { return (jsx(Scaler, __assign({}, props, { dataContext: dataContext }))); } })); });

var calculateDomainFromData = function (data, accessor, minAccessor, maxAccessor) {
    if (minAccessor === void 0) { minAccessor = undefined; }
    if (maxAccessor === void 0) { maxAccessor = undefined; }
    // if there is no data, hard code the domain
    if (!data || !data.length) {
        return [-0.25, 0.25];
    }
    var extent$1;
    if (minAccessor && maxAccessor) {
        extent$1 = [min(data, minAccessor), max(data, maxAccessor)];
    }
    else {
        extent$1 = extent(data, accessor);
    }
    var diff = extent$1[1] - extent$1[0];
    if (Math.abs(diff) < 1e-3) {
        if (extent$1[0] === 0) {
            // If 0 is the only value present in the series, hard code domain.
            return [-0.25, 0.25];
        }
        var domain = [(1 / 2) * extent$1[0], (3 / 2) * extent$1[0]];
        if (domain[1] < domain[0]) {
            return [domain[1], domain[0]];
        }
        return domain;
    }
    return [extent$1[0] - diff * 0.025, extent$1[1] + diff * 0.025];
};
var deleteUndefinedFromObject = function (obj) {
    if (!obj) {
        return {};
    }
    return Object.keys(obj).reduce(function (acc, k) {
        var _a;
        if (obj[k] !== undefined) {
            return __assign(__assign({}, acc), (_a = {}, _a[k] = obj[k], _a));
        }
        return acc;
    }, {});
};
var getTimeSubDomain = function (timeDomain, timeSubDomain, 
// eslint-disable-next-line no-shadow
limitTimeSubDomain) {
    if (limitTimeSubDomain === void 0) { limitTimeSubDomain = function (timeSubDomain) { return timeSubDomain; }; }
    if (!timeSubDomain) {
        return timeDomain;
    }
    var newTimeSubDomain = limitTimeSubDomain(timeSubDomain);
    var timeDomainLength = timeDomain[1] - timeDomain[0];
    var timeSubDomainLength = newTimeSubDomain[1] - newTimeSubDomain[0];
    if (timeDomainLength < timeSubDomainLength) {
        return timeDomain;
    }
    if (newTimeSubDomain[0] < timeDomain[0]) {
        return [timeDomain[0], timeDomain[0] + timeSubDomainLength];
    }
    if (newTimeSubDomain[1] > timeDomain[1]) {
        return [timeDomain[1] - timeSubDomainLength, timeDomain[1]];
    }
    return newTimeSubDomain;
};
var smallerDomain = function (domain, subDomain) {
    if (!domain && !subDomain) {
        return undefined;
    }
    if (!domain || !subDomain) {
        return domain || subDomain;
    }
    return [Math.max(domain[0], subDomain[0]), Math.min(domain[1], subDomain[1])];
};
var boundedDomain = function (a, b) {
    return a && b ? [Math.min(a[0], b[0]), Math.max(a[1], b[1])] : a || b;
};
var DEFAULT_ACCESSORS = {
    time: function (d) { return d.timestamp; },
    x: function (d) { return d.x; },
    y: function (d) { return d.value; },
};
var DEFAULT_SERIES_CONFIG = {
    color: 'black',
    data: [],
    hidden: false,
    drawPoints: false,
    timeAccessor: DEFAULT_ACCESSORS.time,
    xAccessor: DEFAULT_ACCESSORS.x,
    yAccessor: DEFAULT_ACCESSORS.y,
    timeDomain: undefined,
    timeSubDomain: undefined,
    xDomain: undefined,
    xSubDomain: undefined,
    yDomain: undefined,
    ySubDomain: undefined,
    pointWidth: 6,
    strokeWidth: 1,
};
var DataProvider = /** @class */ (function (_super) {
    __extends(DataProvider, _super);
    function DataProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.getSeriesObjects = function () {
            var _a = _this.props, drawLines = _a.drawLines, drawPoints = _a.drawPoints, timeAccessor = _a.timeAccessor, xAccessor = _a.xAccessor, x0Accessor = _a.x0Accessor, x1Accessor = _a.x1Accessor, yAccessor = _a.yAccessor, y0Accessor = _a.y0Accessor, y1Accessor = _a.y1Accessor, timeDomain = _a.timeDomain, timeSubDomain = _a.timeSubDomain, xDomain = _a.xDomain, xSubDomain = _a.xSubDomain, yDomain = _a.yDomain, ySubDomain = _a.ySubDomain, pointWidth = _a.pointWidth, strokeWidth = _a.strokeWidth, opacity = _a.opacity, opacityAccessor = _a.opacityAccessor, pointWidthAccessor = _a.pointWidthAccessor;
            var _b = _this.state, collectionsById = _b.collectionsById, seriesById = _b.seriesById, timeSubDomains = _b.timeSubDomains, xSubDomains = _b.xSubDomains, ySubDomains = _b.ySubDomains;
            return Object.keys(seriesById).reduce(function (acc, id) {
                var series = seriesById[id];
                var dataProvider = {
                    drawLines: drawLines,
                    drawPoints: drawPoints,
                    pointWidth: pointWidth,
                    strokeWidth: strokeWidth,
                    opacity: opacity,
                    opacityAccessor: opacityAccessor,
                    pointWidthAccessor: pointWidthAccessor,
                    timeAccessor: timeAccessor,
                    xAccessor: xAccessor,
                    x0Accessor: x0Accessor,
                    x1Accessor: x1Accessor,
                    yAccessor: yAccessor,
                    y0Accessor: y0Accessor,
                    y1Accessor: y1Accessor,
                };
                var collection = series.collectionId !== undefined
                    ? collectionsById[series.collectionId] || {}
                    : {};
                var completedSeries = __assign(__assign(__assign(__assign(__assign({}, DEFAULT_SERIES_CONFIG), dataProvider), { 
                    // Then the domains because these are in the DataProvider state, which
                    // supercedes the props.
                    timeSubDomain: smallerDomain(timeDomain, timeSubDomain || timeSubDomains[id]), xSubDomain: smallerDomain(xDomain, xSubDomain || xSubDomains[id]), ySubDomain: smallerDomain(yDomain, ySubDomain || ySubDomains[id]), timeDomain: timeDomain, xDomain: xDomain, yDomain: yDomain }), collection), series);
                return __spreadArray(__spreadArray([], acc, true), [completedSeries], false);
            }, []);
        };
        _this.onUpdateInterval = function () {
            var _a = _this.props, isTimeSubDomainSticky = _a.isTimeSubDomainSticky, limitTimeSubDomain = _a.limitTimeSubDomain, updateInterval = _a.updateInterval;
            var _b = _this.state, seriesById = _b.seriesById, timeDomain = _b.timeDomain, timeSubDomain = _b.timeSubDomain;
            var newTimeDomain = timeDomain.map(function (d) { return d + updateInterval; });
            var newTimeSubDomain = isTimeSubDomainSticky
                ? getTimeSubDomain(newTimeDomain, timeSubDomain.map(function (d) { return d + updateInterval; }), limitTimeSubDomain)
                : timeSubDomain;
            _this.setState({
                timeDomain: newTimeDomain,
                timeSubDomain: newTimeSubDomain,
            }, function () {
                Object.keys(seriesById).map(function (id) { return _this.fetchData(id, 'INTERVAL'); });
            });
        };
        _this.startUpdateInterval = function () {
            var updateInterval = _this.props.updateInterval;
            if (_this.fetchInterval) {
                clearInterval(_this.fetchInterval);
            }
            if (updateInterval) {
                _this.fetchInterval = setInterval(_this.onUpdateInterval, updateInterval);
            }
        };
        _this.fetchData = function (id, reason) { return __awaiter(_this, void 0, void 0, function () {
            var _a, defaultLoader, onFetchData, pointsPerSeries, timeAccessor, x0Accessor, x1Accessor, xAccessor, y0Accessor, y1Accessor, yAccessor, onFetchDataError, _b, timeDomain, timeSubDomain, seriesById, seriesObject, loader, loaderResult, params, e_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, defaultLoader = _a.defaultLoader, onFetchData = _a.onFetchData, pointsPerSeries = _a.pointsPerSeries, timeAccessor = _a.timeAccessor, x0Accessor = _a.x0Accessor, x1Accessor = _a.x1Accessor, xAccessor = _a.xAccessor, y0Accessor = _a.y0Accessor, y1Accessor = _a.y1Accessor, yAccessor = _a.yAccessor, onFetchDataError = _a.onFetchDataError;
                        _b = this.state, timeDomain = _b.timeDomain, timeSubDomain = _b.timeSubDomain, seriesById = _b.seriesById;
                        seriesObject = seriesById[id];
                        if (!seriesObject) {
                            return [2 /*return*/];
                        }
                        loader = seriesObject.loader || defaultLoader;
                        if (!loader) {
                            throw new Error("Series ".concat(id, " does not have a loader."));
                        }
                        loaderResult = {};
                        params = {
                            id: id,
                            timeDomain: timeDomain,
                            timeSubDomain: timeSubDomain,
                            pointsPerSeries: pointsPerSeries,
                            oldSeries: __assign({ data: [] }, seriesObject),
                            reason: reason,
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, loader(params)];
                    case 2:
                        loaderResult = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        onFetchDataError(e_1, params);
                        return [3 /*break*/, 4];
                    case 4:
                        this.setState(function (_a) {
                            var _b, _c, _d, _e;
                            var collectionsById = _a.collectionsById, _f = id, freshSeries = _a.seriesById[_f], freshSeriesById = _a.seriesById, freshTimeSubDomains = _a.timeSubDomains, freshXSubDomains = _a.xSubDomains, freshYSubDomains = _a.ySubDomains;
                            var stateUpdates = {};
                            var series = __assign(__assign({}, freshSeries), loaderResult);
                            if (
                            // We either couldn't have any data before ...
                            reason === 'MOUNTED' ||
                                // ... or we didn't have data before, but do now!
                                ((freshSeries.data || []).length === 0 &&
                                    (loaderResult.data || []).length > 0)) {
                                var collection = series.collectionId
                                    ? collectionsById[series.collectionId] || {}
                                    : {};
                                stateUpdates.timeSubDomains = __assign(__assign({}, freshTimeSubDomains), (_b = {}, _b[id] = calculateDomainFromData(series.data, series.timeAccessor || timeAccessor || DEFAULT_ACCESSORS.time), _b));
                                stateUpdates.xSubDomains = __assign(__assign({}, freshXSubDomains), (_c = {}, _c[id] = calculateDomainFromData(series.data, series.xAccessor ||
                                    collection.xAccessor ||
                                    xAccessor ||
                                    DEFAULT_ACCESSORS.x, series.x0Accessor || collection.x0Accessor || x0Accessor, series.x1Accessor || collection.x1Accessor || x1Accessor), _c));
                                stateUpdates.ySubDomains = __assign(__assign({}, freshYSubDomains), (_d = {}, _d[id] = calculateDomainFromData(series.data, series.yAccessor ||
                                    collection.yAccessor ||
                                    yAccessor ||
                                    DEFAULT_ACCESSORS.y, series.y0Accessor || collection.y0Accessor || y0Accessor, series.y1Accessor || collection.y1Accessor || y1Accessor), _d));
                                series.timeSubDomain = series.timeSubDomain || series.timeDomain;
                            }
                            stateUpdates.seriesById = __assign(__assign({}, freshSeriesById), (_e = {}, _e[id] = series, _e));
                            return stateUpdates;
                        }, function () {
                            var _a = _this.state, _b = id, series = _a.seriesById[_b];
                            onFetchData(__assign({}, series));
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.timeSubDomainChanged = function (timeSubDomain) {
            var _a = _this.props, limitTimeSubDomain = _a.limitTimeSubDomain, onTimeSubDomainChanged = _a.onTimeSubDomainChanged;
            var _b = _this.state, timeDomain = _b.timeDomain, current = _b.timeSubDomain, seriesById = _b.seriesById;
            var newTimeSubDomain = getTimeSubDomain(timeDomain, timeSubDomain, limitTimeSubDomain);
            if (isEqual$1(newTimeSubDomain, current)) {
                return;
            }
            clearTimeout(_this.timeSubDomainChangedTimeout);
            _this.timeSubDomainChangedTimeout = setTimeout(function () {
                return Object.keys(seriesById).map(function (id) {
                    return _this.fetchData(id, 'UPDATE_SUBDOMAIN');
                });
            }, 250);
            _this.setState({ timeSubDomain: newTimeSubDomain }, function () {
                if (onTimeSubDomainChanged) {
                    onTimeSubDomainChanged(newTimeSubDomain);
                }
            });
        };
        _this.registerCollection = function (_a) {
            var id = _a.id, collection = __rest(_a, ["id"]);
            _this.setState(function (_a) {
                var _b;
                var collectionsById = _a.collectionsById;
                return ({
                    collectionsById: __assign(__assign({}, collectionsById), (_b = {}, _b[id] = deleteUndefinedFromObject(__assign(__assign({}, collection), { id: id })), _b)),
                });
            });
            // Return an unregistration so that we can do some cleanup.
            return function () {
                _this.setState(function (_a) {
                    var collectionsById = _a.collectionsById;
                    var copy = __assign({}, collectionsById);
                    delete copy[id];
                    return {
                        collectionsById: copy,
                    };
                });
            };
        };
        _this.updateCollection = function (_a) {
            var id = _a.id, collection = __rest(_a, ["id"]);
            _this.setState(function (_a) {
                var _b;
                var collectionsById = _a.collectionsById;
                return ({
                    collectionsById: __assign(__assign({}, collectionsById), (_b = {}, _b[id] = deleteUndefinedFromObject(__assign(__assign(__assign({}, collectionsById[id]), collection), { id: id })), _b)),
                });
            });
        };
        _this.registerSeries = function (_a) {
            var id = _a.id, series = __rest(_a, ["id"]);
            _this.setState(function (_a) {
                var _b;
                var seriesById = _a.seriesById;
                return ({
                    seriesById: __assign(__assign({}, seriesById), (_b = {}, _b[id] = deleteUndefinedFromObject(__assign(__assign({}, series), { id: id })), _b)),
                });
            }, function () {
                _this.fetchData(id, 'MOUNTED');
            });
            // Return an unregistration so that we can do some cleanup.
            return function () {
                _this.setState(function (_a) {
                    var seriesById = _a.seriesById;
                    var copy = __assign({}, seriesById);
                    delete copy[id];
                    return {
                        seriesById: copy,
                    };
                });
            };
        };
        _this.updateSeries = function (_a) {
            var id = _a.id, series = __rest(_a, ["id"]);
            _this.setState(function (_a) {
                var _b;
                var seriesById = _a.seriesById;
                return ({
                    seriesById: __assign(__assign({}, seriesById), (_b = {}, _b[id] = deleteUndefinedFromObject(__assign(__assign(__assign({}, seriesById[id]), series), { id: id })), _b)),
                });
            });
        };
        // Add a helper method to render the legacy props using the new tree structure
        // format. This is only intended to ease the transition pain and is not
        // intended to be an ongoing solution.
        _this.renderLegacyItems = function () {
            var _a = _this.props, series = _a.series, collections = _a.collections;
            if (series || collections) {
                return (jsxs(Fragment, { children: [(series || []).map(function (_a) {
                            var _k = _a.key, s = __rest(_a, ["key"]);
                            return (jsx(Series$1, __assign({}, s), s.id));
                        }), (collections || []).map(function (_a) {
                            var _k = _a.key, c = __rest(_a, ["key"]);
                            return (jsx(Collection$1, __assign({}, c), c.id));
                        })] }));
            }
            return null;
        };
        var limitTimeSubDomain = props.limitTimeSubDomain, timeDomain = props.timeDomain, timeSubDomain = props.timeSubDomain;
        _this.state = {
            timeSubDomain: getTimeSubDomain(timeDomain, timeSubDomain, limitTimeSubDomain),
            timeDomain: timeDomain,
            timeSubDomains: {},
            xSubDomains: {},
            ySubDomains: {},
            collectionsById: {},
            seriesById: {},
        };
        return _this;
    }
    DataProvider.prototype.componentDidMount = function () {
        var updateInterval = this.props.updateInterval;
        if (updateInterval) {
            this.startUpdateInterval();
        }
    };
    DataProvider.prototype.componentDidUpdate = function (prevProps) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limitTimeSubDomain, onTimeSubDomainChanged, pointsPerSeries, series, propsTimeDomain, propsTimeSubDomain, updateInterval, prevUpdateInterval, seriesById_1, newTimeSubDomain_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, limitTimeSubDomain = _a.limitTimeSubDomain, onTimeSubDomainChanged = _a.onTimeSubDomainChanged, pointsPerSeries = _a.pointsPerSeries, series = _a.series, propsTimeDomain = _a.timeDomain, propsTimeSubDomain = _a.timeSubDomain, updateInterval = _a.updateInterval;
                        prevUpdateInterval = prevProps.updateInterval;
                        if (updateInterval !== prevUpdateInterval) {
                            this.startUpdateInterval();
                        }
                        if (!(pointsPerSeries !== prevProps.pointsPerSeries)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.map(series, function (s) {
                                return _this.fetchData(s.id, 'UPDATE_POINTS_PER_SERIES');
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!isEqual$1(propsTimeSubDomain, prevProps.timeSubDomain)) {
                            this.timeSubDomainChanged(propsTimeSubDomain);
                        }
                        // Check if timeDomain changed in props -- if so reset state.
                        if (!isEqual$1(propsTimeDomain, prevProps.timeDomain)) {
                            seriesById_1 = this.state.seriesById;
                            newTimeSubDomain_1 = getTimeSubDomain(propsTimeDomain, propsTimeSubDomain, limitTimeSubDomain);
                            // eslint-disable-next-line
                            this.setState({
                                timeDomain: propsTimeDomain,
                                timeSubDomain: newTimeSubDomain_1,
                                ySubDomains: {},
                            }, function () {
                                Object.keys(seriesById_1).map(function (id) { return _this.fetchData(id, 'MOUNTED'); });
                                if (onTimeSubDomainChanged) {
                                    onTimeSubDomainChanged(newTimeSubDomain_1);
                                }
                            });
                            this.startUpdateInterval();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DataProvider.prototype.componentWillUnmount = function () {
        if (this.fetchInterval) {
            clearInterval(this.fetchInterval);
        }
    };
    DataProvider.prototype.render = function () {
        var _a = this.state, collectionsById = _a.collectionsById, timeDomain = _a.timeDomain, timeSubDomain = _a.timeSubDomain;
        var _b = this.props, children = _b.children, limitTimeSubDomain = _b.limitTimeSubDomain, externalTimeDomain = _b.timeDomain, externalTimeSubDomain = _b.timeSubDomain, yAxisWidth = _b.yAxisWidth, onUpdateDomains = _b.onUpdateDomains;
        var seriesObjects = this.getSeriesObjects();
        // // Compute the domains for all of the collections with one pass over all of
        // // the series objects.
        var domainsByCollectionId = seriesObjects.reduce(function (acc, series) {
            var _a;
            var collectionId = series.collectionId;
            if (!collectionId) {
                return acc;
            }
            var seriesTimeDomain = series.timeDomain, seriesTimeSubDomain = series.timeSubDomain, seriesXDomain = series.xDomain, seriesXSubDomain = series.xSubDomain, seriesYDomain = series.yDomain, seriesYSubDomain = series.ySubDomain;
            var _b = acc[collectionId] || {}, _c = _b.timeDomain, collectionTimeDomain = _c === void 0 ? [
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
            ] : _c, _d = _b.timeSubDomain, collectionTimeSubDomain = _d === void 0 ? [
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
            ] : _d, _e = _b.xDomain, collectionXDomain = _e === void 0 ? [
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
            ] : _e, _f = _b.xSubDomain, collectionXSubDomain = _f === void 0 ? [
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
            ] : _f, _g = _b.yDomain, collectionYDomain = _g === void 0 ? [
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
            ] : _g, _h = _b.ySubDomain, collectionYSubDomain = _h === void 0 ? [
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
            ] : _h;
            return __assign(__assign({}, acc), (_a = {}, _a[collectionId] = {
                timeDomain: seriesTimeDomain
                    ? boundedDomain(collectionTimeDomain, seriesTimeDomain)
                    : undefined,
                timeSubDomain: boundedDomain(collectionTimeSubDomain, seriesTimeSubDomain),
                xDomain: seriesXDomain
                    ? boundedDomain(collectionXDomain, seriesXDomain)
                    : undefined,
                xSubDomain: boundedDomain(collectionXSubDomain, seriesXSubDomain),
                yDomain: seriesYDomain
                    ? boundedDomain(collectionYDomain, seriesYDomain)
                    : undefined,
                ySubDomain: boundedDomain(collectionYSubDomain, seriesYSubDomain),
            }, _a));
        }, {});
        // Then we want to enrich the collection objects with their above-computed
        // domains.
        var collectionsWithDomains = Object.keys(collectionsById).reduce(function (acc, id) {
            if (!domainsByCollectionId[id]) {
                return acc;
            }
            return __spreadArray(__spreadArray([], acc, true), [
                __assign(__assign({}, collectionsById[id]), domainsByCollectionId[id]),
            ], false);
        }, []);
        // Then take a final pass over all of the series and replace their
        // yDomain and ySubDomain arrays with the one from their collections (if
        // they're a member of a collection).
        var collectedSeries = seriesObjects.map(function (s) {
            var collectionId = s.collectionId;
            if (collectionId === undefined) {
                return s;
            }
            var copy = __assign({}, s);
            if (!collectionsById[collectionId]) {
                // It's pointing to a collection that doesn't exist.
                delete copy.collectionId;
            }
            else {
                var _a = domainsByCollectionId[collectionId] || {}, collectionTimeDomain = _a.timeDomain, collectionTimeSubDomain = _a.timeSubDomain, collectionXDomain = _a.xDomain, collectionXSubDomain = _a.xSubDomain, collectionYDomain = _a.yDomain, collectionYSubDomain = _a.ySubDomain;
                if (collectionTimeDomain) {
                    copy.timeDomain = collectionTimeDomain;
                }
                if (collectionTimeSubDomain) {
                    copy.timeSubDomain = collectionTimeSubDomain;
                }
                if (collectionXDomain) {
                    copy.xDomain = collectionXDomain;
                }
                if (collectionXSubDomain) {
                    copy.xSubDomain = collectionXSubDomain;
                }
                if (collectionYDomain) {
                    copy.yDomain = collectionYDomain;
                }
                if (collectionYSubDomain) {
                    copy.ySubDomain = collectionYSubDomain;
                }
            }
            return copy;
        });
        var context = {
            series: collectedSeries,
            collections: collectionsWithDomains,
            timeDomain: timeDomain,
            // This is used to signal external changes vs internal changes
            externalTimeDomain: externalTimeDomain,
            timeSubDomain: timeSubDomain,
            // This is used to signal external changes vs internal changes
            externalTimeSubDomain: externalTimeSubDomain,
            yAxisWidth: yAxisWidth,
            timeSubDomainChanged: this.timeSubDomainChanged,
            limitTimeSubDomain: limitTimeSubDomain,
            onUpdateDomains: onUpdateDomains,
            registerCollection: this.registerCollection,
            updateCollection: this.updateCollection,
            registerSeries: this.registerSeries,
            updateSeries: this.updateSeries,
        };
        return (jsxs(DataContext.Provider, { value: context, children: [this.renderLegacyItems(), jsx(Scaler$1, { children: children })] }));
    };
    return DataProvider;
}(Component));
DataProvider.propTypes = {
    /**
     * A custom renderer for data points.
     *
     * @param {object} datapoint Current data point being rendered
     * @param {number} index Index of this current data point
     * @param {Array} datapoints All of the data points to be rendered
     * @param {object} metadata This object contains metadata useful for the
     * rendering process. This contains the following keys:
     *  - {@code x}: The x-position (in pixels) of the data point.
     *  - {@code x0}: The x-position (in pixels) for the data point's x0 value
     *  - {@code x1}: The x-position (in pixels) for the data point's x1 value
     *  - {@code y}: The y-position (in pixels) of the data point.
     *  - {@code y0}: The y-position (in pixels) for the data point's y0 value
     *  - {@code y1}: The y-position (in pixels) for the data point's y1 value
     *  - {@code color}: The color of this data point
     *  - {@code opacity}: The opacity of this data point
     *  - {@code opacityAccessor}: The opacity accessor for this data point
     *  - {@code pointWidth}: The width of this data point
     *  - {@code pointWidthAccessor}: The accessor for this data point's width
     *  - {@code strokeWidth}: The width of the stroke for this data point
     * @param {Array} elements This is an array of the items that Griff would
     * render for this data point. If custom rendering is not desired for this
     * data point, return this array as-is
     * @returns {(object|Array)} object(s) to render for this point.
     */
    drawPoints: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    drawLines: PropTypes.bool,
    timeDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    timeSubDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    xDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    xSubDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    updateInterval: PropTypes.number,
    timeAccessor: PropTypes.func,
    xAccessor: PropTypes.func,
    x0Accessor: PropTypes.func,
    x1Accessor: PropTypes.func,
    yAccessor: PropTypes.func,
    y0Accessor: PropTypes.func,
    y1Accessor: PropTypes.func,
    yAxisWidth: PropTypes.number,
    yDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    ySubDomain: PropTypes.arrayOf(PropTypes.number.isRequired),
    pointsPerSeries: PropTypes.number,
    children: PropTypes.node.isRequired,
    defaultLoader: PropTypes.func,
    // xSubDomain => void
    onTimeSubDomainChanged: PropTypes.func,
    // newSubDomainsPerItem => void
    onUpdateDomains: PropTypes.func,
    opacity: PropTypes.number,
    /** (datapoint, index, datapoints) => number */
    opacityAccessor: PropTypes.func,
    pointWidth: PropTypes.number,
    /** (datapoint, index, datapoints) => number */
    pointWidthAccessor: PropTypes.func,
    strokeWidth: PropTypes.number,
    // if set to true and an updateInterval is provided, xSubDomain
    // will be increased at every interval (similarly to xDomain)
    isTimeSubDomainSticky: PropTypes.bool,
    // timeSubDomain => timeSubDomain
    // function to allow limitation of the value of timeSubDomain
    limitTimeSubDomain: PropTypes.func,
    // loaderConfig => void
    // called whenever data is fetched by the loader
    onFetchData: PropTypes.func,
    // (error, params) => void
    // Callback when data loader throws an error
    onFetchDataError: PropTypes.func,
    series: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })),
    collections: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })),
};
DataProvider.defaultProps = {
    defaultLoader: undefined,
    drawPoints: undefined,
    drawLines: undefined,
    onTimeSubDomainChanged: undefined,
    onUpdateDomains: undefined,
    opacity: 1.0,
    opacityAccessor: undefined,
    pointsPerSeries: 250,
    pointWidth: undefined,
    pointWidthAccessor: undefined,
    strokeWidth: undefined,
    timeDomain: undefined,
    timeSubDomain: undefined,
    xDomain: undefined,
    xSubDomain: undefined,
    updateInterval: 0,
    timeAccessor: function (d) { return d.timestamp; },
    x0Accessor: undefined,
    x1Accessor: undefined,
    xAccessor: function (d) { return d.timestamp; },
    y0Accessor: undefined,
    y1Accessor: undefined,
    yAccessor: function (d) { return d.value; },
    yAxisWidth: 50,
    yDomain: undefined,
    ySubDomain: undefined,
    isTimeSubDomainSticky: false,
    limitTimeSubDomain: function (xSubDomain) { return xSubDomain; },
    onFetchData: function () { },
    // Just rethrow the error if there is no custom error handler
    onFetchDataError: function (e) {
        throw e;
    },
    series: [],
    collections: [],
};

var propTypes$1 = {
    height: PropTypes.number,
    annotations: PropTypes.arrayOf(annotationPropType),
    zoomable: PropTypes.bool,
    // Number => String
    xAxisFormatter: PropTypes.func,
    xAxisHeight: PropTypes.number,
    xAxisPlacement: GriffPropTypes.axisPlacement,
    // These are all provided by Griff.
    domainsByItemId: GriffPropTypes.domainsByItemId.isRequired,
    series: GriffPropTypes.multipleSeries.isRequired,
    subDomainsByItemId: GriffPropTypes.subDomainsByItemId.isRequired,
    updateDomains: GriffPropTypes.updateDomains.isRequired,
    width: PropTypes.number,
};
var onUpdateSelection = function (selection, _a) {
    var series = _a.series, timeDomain = _a.timeDomain, updateDomains = _a.updateDomains, width = _a.width;
    var xScale = createXScale(timeDomain, width);
    var timeSubDomain = selection.map(xScale.invert).map(Number);
    updateDomains(series.reduce(function (changes, s) {
        var _a;
        return (__assign(__assign({}, changes), (_a = {}, _a[s.id] = {
            time: timeSubDomain,
        }, _a)));
    }, {}));
};
var getChartHeight = function (_a) {
    var height = _a.height, xAxisHeight = _a.xAxisHeight, xAxisPlacement = _a.xAxisPlacement;
    return height -
        xAxisHeight -
        (xAxisPlacement === AXIS_PLACEMENTS.BOTH ? xAxisHeight : 0);
};
var renderXAxis = function (position, xAxis, _a) {
    var xAxisPlacement = _a.xAxisPlacement;
    if (position === xAxisPlacement) {
        return xAxis;
    }
    if (xAxisPlacement === AXIS_PLACEMENTS.BOTH) {
        return React.cloneElement(xAxis, { placement: position });
    }
    return null;
};
var ContextChart = function (_a) {
    var _b = _a.annotations, propsAnnotations = _b === void 0 ? [] : _b, domainsByItemId = _a.domainsByItemId, _c = _a.height, propsHeight = _c === void 0 ? 150 : _c, series = _a.series, subDomainsByItemId = _a.subDomainsByItemId, updateDomains = _a.updateDomains, _d = _a.width, width = _d === void 0 ? 1 : _d, _e = _a.xAxisFormatter, xAxisFormatter = _e === void 0 ? multiFormat : _e, _f = _a.xAxisHeight, xAxisHeight = _f === void 0 ? 50 : _f, _g = _a.xAxisPlacement, xAxisPlacement = _g === void 0 ? AXIS_PLACEMENTS.BOTTOM : _g, _h = _a.zoomable, zoomable = _h === void 0 ? true : _h;
    if (series.length === 0) {
        return null;
    }
    var getYScale = function (s, height) {
        var domain = firstResolvedDomain(s.yDomain, AXES.y(domainsByItemId[s.collectionId || s.id])) ||
            calculateDomainFromData(s.data, s.yAccessor, s.y0Accessor, s.y1Accessor);
        return createYScale(domain, height);
    };
    var firstItemId = series[0].id;
    var timeDomain = AXES.time(domainsByItemId[firstItemId]);
    var timeSubDomain = AXES.time(subDomainsByItemId[firstItemId]);
    var height = getChartHeight({
        height: propsHeight,
        xAxisHeight: xAxisHeight,
        xAxisPlacement: xAxisPlacement,
    });
    var xScale = createXScale(timeDomain, width);
    var selection = timeSubDomain.map(xScale);
    var annotations = propsAnnotations.map(function (a) { return (jsx(Annotation, __assign({}, a, { height: height, xScale: xScale }), a.id)); });
    var xAxis = (jsx(XAxis$1, { height: xAxisHeight, domain: timeDomain, tickFormatter: xAxisFormatter, placement: xAxisPlacement, scaled: false, axis: AXES.time }));
    return (jsxs(Fragment, { children: [renderXAxis(AXIS_PLACEMENTS.TOP, xAxis, { xAxisPlacement: xAxisPlacement }), jsxs("svg", { height: height / 2, width: width, style: { width: '100%', display: 'block' }, children: [annotations, jsx(LineCollection$1, { series: series.map(function (s) { return (__assign(__assign({}, s), { drawPoints: false, hidden: true })); }), width: width, height: height, yScalerFactory: getYScale, scaleY: false, scaleX: false, subDomainsByItemId: subDomainsByItemId }), jsx(Brush, { width: width, height: height, selection: selection, onUpdateSelection: function (newSelection) {
                            return onUpdateSelection(newSelection, {
                                series: series,
                                timeDomain: timeDomain,
                                updateDomains: updateDomains,
                                width: width,
                            });
                        }, zoomable: zoomable })] }), renderXAxis(AXIS_PLACEMENTS.BOTTOM, xAxis, { xAxisPlacement: xAxisPlacement })] }));
};
ContextChart.propTypes = propTypes$1;
ContextChart.defaultProps = {
    annotations: [],
    height: 150,
    width: 1,
    xAxisFormatter: multiFormat,
    xAxisHeight: 50,
    xAxisPlacement: AXIS_PLACEMENTS.BOTTOM,
    zoomable: true,
};
var SizedContextChart = function (_a) {
    var explicitWidth = _a.width, rest = __rest(_a, ["width"]);
    var _b = useResizeDetector(), ref = _b.ref, width = _b.width;
    return (jsx("div", { ref: ref, style: { width: '100%' }, children: jsx(ContextChart, __assign({}, rest, { width: explicitWidth !== undefined ? explicitWidth : width || 1 })) }));
};
SizedContextChart.propTypes = {
    width: PropTypes.number,
};
SizedContextChart.defaultProps = {
    width: undefined,
};
var ContextChart$1 = withDisplayName('ContextChart', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var domainsByItemId = _a.domainsByItemId, subDomainsByItemId = _a.subDomainsByItemId, updateDomains = _a.updateDomains, series = _a.series;
        return (jsx(SizedContextChart, __assign({}, props, { series: series, subDomainsByItemId: subDomainsByItemId, domainsByItemId: domainsByItemId, updateDomains: updateDomains })));
    } })); });

var GridLines = function (_a) {
    var _b = _a.axes, axes = _b === void 0 ? { x: 'x' } : _b, _c = _a.color, color = _c === void 0 ? '#666' : _c, height = _a.height, _d = _a.opacity, opacity = _d === void 0 ? 0.6 : _d, series = _a.series, _e = _a.strokeWidth, strokeWidth = _e === void 0 ? 1 : _e, subDomainsByItemId = _a.subDomainsByItemId, width = _a.width, x = _a.x, y = _a.y;
    if (!x && !y) {
        return null;
    }
    var lines = [];
    if (y) {
        if (y.seriesIds) {
            var seriesIdMap_1 = y.seriesIds.reduce(function (dict, id) {
                var _a;
                return (__assign(__assign({}, dict), (_a = {}, _a[id] = true, _a)));
            }, {});
            series
                .filter(function (s) { return seriesIdMap_1[s.id]; })
                .forEach(function (s) {
                // This is heavily inspired by YAxis -- maybe we could consolidate?
                var scale = createYScale(AXES.y(subDomainsByItemId[s.id]), height);
                var nTicks = y.count || Math.floor(height / 50) || 1;
                var values = scale.ticks(nTicks);
                values.forEach(function (v) {
                    lines.push(jsx("line", { className: "grid-line grid-line-horizontal", opacity: y.opacity || opacity, stroke: y.color === null ? s.color : y.color || color, strokeWidth: y.strokeWidth || strokeWidth, x1: 0, x2: width, y1: (y.strokeWidth || strokeWidth) / 2, y2: (y.strokeWidth || strokeWidth) / 2, transform: "translate(0, ".concat(scale(v), ")") }, "horizontal-".concat(s.id, "-").concat(v)));
                });
            });
        }
        else if (y.pixels) {
            for (var position = (height % y.pixels) / 2; position <= height; position += y.pixels) {
                lines.push(jsx("line", { className: "grid-line grid-line-horizontal", x1: 0, x2: width, y1: position, y2: position, stroke: y.color || color, strokeWidth: y.strokeWidth || strokeWidth, opacity: y.opacity || opacity }, "horizontal-".concat(position)));
            }
        }
        else if (y.count) {
            var interval = height / y.count;
            for (var position = interval / 2; position <= height; position += interval) {
                lines.push(jsx("line", { className: "grid-line grid-line-horizontal", x1: 0, x2: width, y1: position, y2: position, stroke: y.color || color, strokeWidth: y.strokeWidth || strokeWidth, opacity: y.opacity || opacity }, "horizontal-".concat(position)));
            }
        }
    }
    if (x) {
        if (x.pixels) {
            for (var position = (width % x.pixels) / 2; position <= width; position += x.pixels) {
                lines.push(jsx("line", { className: "grid-line grid-line-vertical", y1: 0, y2: height, x1: position, x2: position, stroke: x.color || color, strokeWidth: x.strokeWidth || strokeWidth, opacity: x.opacity || opacity }, "vertical-".concat(position)));
            }
        }
        else if (x.ticks !== undefined) {
            // This heavily inspired by XAxis -- maybe we can consolidate them?
            // FIXME: Remove this when we support multiple X axes
            var timeSubDomain = subDomainsByItemId[Object.keys(subDomainsByItemId)[0]][axes.x];
            var scale_1 = createXScale(timeSubDomain, width);
            var values = scale_1.ticks(x.ticks || Math.floor(width / 100) || 1);
            values.forEach(function (v) {
                lines.push(jsx("line", { className: "grid-line grid-line-vertical", opacity: x.opacity || opacity, stroke: x.color || color, strokeWidth: x.strokeWidth || strokeWidth, y1: 0, y2: height, x1: (x.strokeWidth || strokeWidth) / 2, x2: (x.strokeWidth || strokeWidth) / 2, transform: "translate(".concat(scale_1(v), ", 0)") }, "vertical-".concat(+v)));
            });
        }
        else if (x.count) {
            var interval = width / x.count;
            for (var position = interval / 2; position <= width; position += interval) {
                lines.push(jsx("line", { className: "grid-line grid-line-vertical", y1: 0, y2: height, x1: position, x2: position, stroke: x.color || color, strokeWidth: x.strokeWidth || strokeWidth, opacity: x.opacity || opacity }, "vertical-".concat(position)));
            }
        }
    }
    return jsx("g", { children: lines });
};
var index = withDisplayName('GridLines', function (_a) {
    var width = _a.width, height = _a.height, props = __rest(_a, ["width", "height"]);
    return (jsx(ScalerContext.Consumer, { children: function (_a) {
            var series = _a.series, subDomainsByItemId = _a.subDomainsByItemId;
            return (jsx(GridLines, __assign({}, props, { width: width, height: height, series: series, subDomainsByItemId: subDomainsByItemId })));
        } }));
});

var propTypes$2 = {
    zoomable: PropTypes.bool,
    offsetx: PropTypes.number.isRequired,
    series: singleSeriePropType,
    collection: GriffPropTypes.collection,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    yAxisPlacement: GriffPropTypes.axisPlacement,
    // (number, values) => String
    tickFormatter: PropTypes.func.isRequired,
    defaultColor: PropTypes.string,
    ticks: PropTypes.number,
    // These are populated by Griff.
    subDomainsByItemId: GriffPropTypes.subDomainsByItemId.isRequired,
};
var defaultProps$1 = {
    series: null,
    collection: null,
    zoomable: true,
    onMouseEnter: null,
    onMouseLeave: null,
    yAxisPlacement: AXIS_PLACEMENTS.RIGHT,
    defaultColor: '#000',
    ticks: 0,
};
var getItem = function (series, collection) { return series || collection; };
var getLineProps$1 = function (_a) {
    var strokeWidth = _a.strokeWidth, tickSizeInner = _a.tickSizeInner, width = _a.width, yAxisPlacement = _a.yAxisPlacement;
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.LEFT:
            return {
                x1: width - strokeWidth,
                x2: width - strokeWidth - tickSizeInner,
                y1: strokeWidth / 2,
                y2: strokeWidth / 2,
            };
        case AXIS_PLACEMENTS.BOTH:
            throw new Error('BOTH is not a valid option for YAxis -- please specify RIGHT or LEFT');
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return {
                x1: 0,
                x2: tickSizeInner,
                y1: strokeWidth / 2,
                y2: strokeWidth / 2,
            };
    }
};
var getTextProps$1 = function (_a) {
    var strokeWidth = _a.strokeWidth, tickPadding = _a.tickPadding, tickSizeInner = _a.tickSizeInner, width = _a.width, yAxisPlacement = _a.yAxisPlacement;
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.LEFT:
            return {
                x: Math.max(width - tickSizeInner, 0) - tickPadding,
                y: strokeWidth / 2,
            };
        case AXIS_PLACEMENTS.BOTH:
            throw new Error('BOTH is not a valid option for YAxis -- please specify RIGHT or LEFT');
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return {
                x: Math.max(tickSizeInner, 0) + tickPadding,
                y: strokeWidth / 2,
            };
    }
};
var getPathString$1 = function (_a) {
    var range = _a.range, strokeWidth = _a.strokeWidth, tickSizeOuter = _a.tickSizeOuter, width = _a.width, yAxisPlacement = _a.yAxisPlacement;
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.LEFT:
            return [
                "M".concat(width - tickSizeOuter, ",").concat(range[0] - strokeWidth),
                "H".concat(width - strokeWidth),
                "V".concat(range[1]),
                "H".concat(width - tickSizeOuter),
            ].join('');
        case AXIS_PLACEMENTS.BOTH:
            throw new Error('BOTH is not a valid option for YAxis -- please specify RIGHT or LEFT');
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return [
                // Move to this (x,y); start drawing
                "M".concat(tickSizeOuter, ",").concat(range[0] - strokeWidth),
                // Draw a horizontal line half strokeWidth long
                "H".concat(strokeWidth / 2),
                // Draw a vertical line from bottom to top
                "V".concat(range[1]),
                // Finish with another horizontal line
                "H".concat(tickSizeOuter),
            ].join('');
    }
};
var getTextAnchor = function (_a) {
    var yAxisPlacement = _a.yAxisPlacement;
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.LEFT:
            return 'end';
        case AXIS_PLACEMENTS.BOTH:
            throw new Error('BOTH is not a valid option for YAxis -- please specify RIGHT or LEFT');
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return 'start';
    }
};
var YAxis = function (_a) {
    var collection = _a.collection, defaultColor = _a.defaultColor, height = _a.height, offsetx = _a.offsetx, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, series = _a.series, subDomainsByItemId = _a.subDomainsByItemId, tickFormatter = _a.tickFormatter, ticks = _a.ticks, width = _a.width, yAxisPlacement = _a.yAxisPlacement, zoomable = _a.zoomable;
    var item = getItem(series, collection);
    var color = item.color || defaultColor;
    var scale = createYScale(AXES.y(subDomainsByItemId[item.id]), height);
    var axis = axisRight(scale);
    var tickFontSize = 14;
    var strokeWidth = 2;
    var halfStrokeWidth = strokeWidth / 2;
    var tickSizeOuter = axis.tickSizeOuter();
    var tickSizeInner = axis.tickSizeInner();
    var tickPadding = axis.tickPadding();
    // same as for xAxis but consider height of the screen ~two times smaller
    var nTicks = ticks || Math.floor(height / 50) || 1;
    var values = scale.ticks(nTicks);
    var range = scale.range().map(function (r) { return r + halfStrokeWidth; });
    var axisElement = (jsxs("g", { "data-testid": "yAxis-".concat(item.id), className: "axis y-axis", fill: "none", fontSize: tickFontSize, textAnchor: getTextAnchor({ yAxisPlacement: yAxisPlacement }), strokeWidth: strokeWidth, children: [jsx("path", { stroke: color, d: getPathString$1({
                    range: range,
                    strokeWidth: strokeWidth,
                    tickSizeOuter: tickSizeOuter,
                    width: width,
                    yAxisPlacement: yAxisPlacement,
                }) }), values.map(function (v) {
                var lineProps = __assign({ stroke: color }, getLineProps$1({
                    strokeWidth: strokeWidth,
                    tickSizeInner: tickSizeInner,
                    width: width,
                    yAxisPlacement: yAxisPlacement,
                }));
                var textProps = __assign({ fill: color, dy: '0.32em' }, getTextProps$1({
                    strokeWidth: strokeWidth,
                    tickPadding: tickPadding,
                    tickSizeInner: tickSizeInner,
                    width: width,
                    yAxisPlacement: yAxisPlacement,
                }));
                return (jsxs("g", { opacity: 1, transform: "translate(0, ".concat(scale(v), ")"), children: [jsx("line", __assign({}, lineProps)), jsx("text", __assign({ className: "tick-value" }, textProps, { children: tickFormatter(+v, values) }))] }, +v));
            })] }));
    var cursor = zoomable ? 'move' : 'inherit';
    var id = collection ? collection.id : series.id;
    return (jsxs("g", { className: "axis-y axis-y-".concat(id), transform: "translate(".concat(offsetx, ", 0)"), cursor: cursor, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, children: [axisElement, zoomable && (jsx(ZoomRect$1, { width: width, height: height, zoomAxes: { y: true }, itemIds: [getItem(series, collection).id] }))] }));
};
YAxis.propTypes = propTypes$2;
YAxis.defaultProps = defaultProps$1;
var YAxis$1 = withDisplayName('YAxis', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var subDomainsByItemId = _a.subDomainsByItemId;
        return (jsx(YAxis, __assign({}, props, { subDomainsByItemId: subDomainsByItemId })));
    } })); });

var propTypes$3 = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    offsetx: PropTypes.number,
    color: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    yAxisPlacement: GriffPropTypes.axisPlacement,
};
var defaultProps$2 = {
    color: '#666',
    offsetx: 0,
    onMouseEnter: null,
    onMouseLeave: null,
    yAxisPlacement: AXIS_PLACEMENTS.RIGHT,
};
var getPath = function (_a) {
    var offsetx = _a.offsetx, strokeWidth = _a.strokeWidth, tickSizeOuter = _a.tickSizeOuter, range = _a.range, yAxisPlacement = _a.yAxisPlacement, width = _a.width;
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.LEFT:
            return [
                // Move to this (x,y); start drawing
                "M ".concat(width - offsetx, " ").concat(strokeWidth),
                // Draw a horizontal line to the left
                "h ".concat(tickSizeOuter - strokeWidth),
                // Draw a vertical line from top to bottom
                "v ".concat(range[0] - strokeWidth * 2),
                // Finish with another horizontal line
                "h -".concat(tickSizeOuter - strokeWidth / 2),
            ].join(' ');
        case AXIS_PLACEMENTS.BOTH:
            throw new Error('BOTH is not a valid option for CollapsedAxis -- please specify RIGHT or LEFT');
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return [
                // Move to this (x,y); start drawing
                "M ".concat(offsetx, " ").concat(strokeWidth),
                // Draw a horizontal line to the left
                "h -".concat(tickSizeOuter - strokeWidth),
                // Draw a vertical line from top to bottom
                "v ".concat(range[0] - strokeWidth * 2),
                // Finish with another horizontal line
                "h ".concat(tickSizeOuter - strokeWidth / 2),
            ].join(' ');
    }
};
var CollapsedAxis = function (_a) {
    var height = _a.height, width = _a.width, initialOffsetX = _a.offsetx, color = _a.color, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, yAxisPlacement = _a.yAxisPlacement;
    var renderAxis = function () {
        var scale = createYScale([0, 100], height);
        var axis = axisRight(scale);
        var tickFontSize = 14;
        var strokeWidth = 2;
        var tickSizeOuter = axis.tickSizeOuter();
        var range = scale.range();
        var paths = {};
        var offsetx = 0;
        for (var i = 1; i < 4; i += 1) {
            offsetx += tickSizeOuter;
            paths[i] = {
                path: getPath({
                    offsetx: offsetx,
                    strokeWidth: strokeWidth,
                    tickSizeOuter: tickSizeOuter,
                    range: range,
                    yAxisPlacement: yAxisPlacement,
                    width: width,
                }),
                color: color,
                opacity: 1 - (i - 1) / 4,
            };
            offsetx += 3;
        }
        return (jsx("g", { className: "axis", fill: "none", fontSize: tickFontSize, textAnchor: "start", strokeWidth: strokeWidth, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, children: Object.keys(paths).map(function (key) { return (jsx("path", { stroke: paths[key].color, opacity: paths[key].opacity || 1, d: paths[key].path }, key)); }) }));
    };
    return (jsx("g", { className: "axis-y collapsed-axis-y", transform: "translate(".concat(initialOffsetX, ", 0)"), children: renderAxis() }));
};
CollapsedAxis.propTypes = propTypes$3;
CollapsedAxis.defaultProps = defaultProps$2;

var propTypes$4 = {
    height: PropTypes.number.isRequired,
    zoomable: PropTypes.bool,
    axisDisplayMode: axisDisplayModeType,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    yAxisPlacement: GriffPropTypes.axisPlacement,
    ticks: PropTypes.number,
    // Number => String
    tickFormatter: PropTypes.func,
    // These are populated by Griff.
    series: seriesPropType,
    collections: GriffPropTypes.collections,
    yAxisWidth: PropTypes.number,
};
var onAxisMouseEnter = function (seriesId, _a) {
    var onMouseEnter = _a.onMouseEnter;
    return onMouseEnter ? function (e) { return onMouseEnter(e, seriesId); } : null;
};
var onAxisMouseLeave = function (seriesId, _a) {
    var onMouseLeave = _a.onMouseLeave;
    return onMouseLeave ? function (e) { return onMouseLeave(e, seriesId); } : null;
};
var axisFilter = function (mode) { return function (s, _a) {
    var axisDisplayMode = _a.axisDisplayMode;
    return !s.hidden && (s.yAxisDisplayMode || axisDisplayMode) === mode;
}; };
var ALL_FILTER = axisFilter(AXIS_DISPLAY_MODES.ALL);
var COLLAPSED_FILTER = axisFilter(AXIS_DISPLAY_MODES.COLLAPSED);
var placementFilter = function (s, _a) {
    var yAxisPlacement = _a.yAxisPlacement;
    return !s.yAxisPlacement ||
        s.yAxisPlacement === AXIS_PLACEMENTS.BOTH ||
        s.yAxisPlacement === yAxisPlacement;
};
var getAxisOffsets = function (_a) {
    var axisDisplayMode = _a.axisDisplayMode, collections = _a.collections, series = _a.series, yAxisPlacement = _a.yAxisPlacement, yAxisWidth = _a.yAxisWidth;
    var numCollapsed = series
        .concat(collections)
        .filter(function (item) { return COLLAPSED_FILTER(item, { axisDisplayMode: axisDisplayMode }); }).length;
    var numVisible = series.reduce(function (count, s) {
        if (s.collectionId === undefined && ALL_FILTER(s, { axisDisplayMode: axisDisplayMode })) {
            return count + 1;
        }
        return count;
    }, 0) + collections.filter(function (c) { return ALL_FILTER(c, { axisDisplayMode: axisDisplayMode }); }).length;
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.LEFT:
            return {
                collapsed: 0,
                visible: numCollapsed ? yAxisWidth : 0,
            };
        case AXIS_PLACEMENTS.BOTH:
            throw new Error('BOTH is not a valid option for AxisCollection -- please specify RIGHT or LEFT');
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return {
                collapsed: numVisible * yAxisWidth,
                visible: 0,
            };
    }
};
var renderAllVisibleAxes = function (offsetx, _a) {
    var axisDisplayMode = _a.axisDisplayMode, collections = _a.collections, height = _a.height, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, series = _a.series, tickFormatter = _a.tickFormatter, ticks = _a.ticks, yAxisPlacement = _a.yAxisPlacement, yAxisWidth = _a.yAxisWidth, zoomable = _a.zoomable;
    var axisOffsetX = offsetx - yAxisWidth;
    var filteredCollections = collections
        .filter(function (c) { return ALL_FILTER(c, { axisDisplayMode: axisDisplayMode }); })
        .filter(function (c) { return placementFilter(c, { yAxisPlacement: yAxisPlacement }); });
    if (yAxisPlacement === AXIS_PLACEMENTS.LEFT) {
        filteredCollections.reverse();
    }
    var filteredSeries = series.filter(function (s) {
        return ALL_FILTER(s, { axisDisplayMode: axisDisplayMode }) &&
            placementFilter(s, { yAxisPlacement: yAxisPlacement }) &&
            s.collectionId === undefined;
    });
    if (yAxisPlacement === AXIS_PLACEMENTS.LEFT) {
        filteredSeries.reverse();
    }
    return []
        .concat(filteredSeries.map(function (s) {
        axisOffsetX += yAxisWidth;
        return (jsx(YAxis$1, { offsetx: axisOffsetX, zoomable: s.zoomable !== undefined ? s.zoomable : zoomable, series: s, height: height, width: yAxisWidth, onMouseEnter: onAxisMouseEnter(s.id, { onMouseEnter: onMouseEnter }), onMouseLeave: onAxisMouseLeave(s.id, { onMouseLeave: onMouseLeave }), tickFormatter: tickFormatter, yAxisPlacement: yAxisPlacement, ticks: ticks }, "y-axis--".concat(s.id)));
    }))
        .concat(filteredCollections.map(function (c) {
        axisOffsetX += yAxisWidth;
        return (jsx(YAxis$1, { offsetx: axisOffsetX, zoomable: c.zoomable !== undefined ? c.zoomable : zoomable, collection: c, height: height, width: yAxisWidth, onMouseEnter: onAxisMouseEnter(c.id, { onMouseEnter: onMouseEnter }), onMouseLeave: onAxisMouseLeave(c.id, { onMouseLeave: onMouseLeave }), tickFormatter: tickFormatter, yAxisPlacement: yAxisPlacement, ticks: ticks }, "y-axis-collection-".concat(c.id)));
    }));
};
var renderPlaceholderAxis = function (offsetx, _a) {
    var axisDisplayMode = _a.axisDisplayMode, collections = _a.collections, height = _a.height, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, series = _a.series, yAxisPlacement = _a.yAxisPlacement, yAxisWidth = _a.yAxisWidth;
    var collapsed = series
        .filter(function (s) { return placementFilter(s, { yAxisPlacement: yAxisPlacement }); })
        .concat(collections)
        .filter(function (item) { return COLLAPSED_FILTER(item, { axisDisplayMode: axisDisplayMode }); });
    // TODO: Should we only do this if there's more than 1?
    if (collapsed.length) {
        return (jsx(CollapsedAxis, { height: height, offsetx: offsetx, width: yAxisWidth, onMouseEnter: onAxisMouseEnter('collapsed', { onMouseEnter: onMouseEnter }), onMouseLeave: onAxisMouseLeave('collapsed', { onMouseLeave: onMouseLeave }), yAxisPlacement: yAxisPlacement }, "y-axis--collapsed"));
    }
    return null;
};
var AxisCollection = function (_a) {
    var _b = _a.axisDisplayMode, axisDisplayMode = _b === void 0 ? AXIS_DISPLAY_MODES.ALL : _b, _c = _a.collections, collections = _c === void 0 ? [] : _c, height = _a.height, _d = _a.onMouseEnter, onMouseEnter = _d === void 0 ? null : _d, _e = _a.onMouseLeave, onMouseLeave = _e === void 0 ? null : _e, _f = _a.series, series = _f === void 0 ? [] : _f, _g = _a.tickFormatter, tickFormatter = _g === void 0 ? Number : _g, _h = _a.ticks, ticks = _h === void 0 ? 5 : _h, _j = _a.yAxisPlacement, yAxisPlacement = _j === void 0 ? AXIS_PLACEMENTS.RIGHT : _j, _k = _a.yAxisWidth, yAxisWidth = _k === void 0 ? 50 : _k, _l = _a.zoomable, zoomable = _l === void 0 ? true : _l;
    var calculatedWidth = []
        .concat(series)
        .concat(collections)
        .filter(function (item) { return item.collectionId === undefined; })
        .filter(function (item) { return ALL_FILTER(item, { axisDisplayMode: axisDisplayMode }); })
        .filter(function (item) { return placementFilter(item, { yAxisPlacement: yAxisPlacement }); })
        .reduce(function (acc, item) {
        if (item.yAxisDisplayMode === AXIS_DISPLAY_MODES.COLLAPSED) {
            return acc;
        }
        return acc + yAxisWidth;
    }, series.filter(function (s) { return COLLAPSED_FILTER(s, { axisDisplayMode: axisDisplayMode }); }).length
        ? yAxisWidth
        : 0);
    var _m = getAxisOffsets({
        axisDisplayMode: axisDisplayMode,
        collections: collections,
        series: series,
        yAxisPlacement: yAxisPlacement,
        yAxisWidth: yAxisWidth,
    }), collapsedOffsetX = _m.collapsed, visibleOffsetX = _m.visible;
    // We need to render all of the axes (even if they're hidden) in order to
    // keep the zoom states in sync across show/hide toggles.
    var axes = renderAllVisibleAxes(visibleOffsetX, {
        axisDisplayMode: axisDisplayMode,
        collections: collections,
        height: height,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        series: series,
        tickFormatter: tickFormatter,
        ticks: ticks,
        yAxisPlacement: yAxisPlacement,
        yAxisWidth: yAxisWidth,
        zoomable: zoomable,
    });
    return (jsxs("svg", { width: calculatedWidth, height: height, children: [axes, renderPlaceholderAxis(collapsedOffsetX, {
                axisDisplayMode: axisDisplayMode,
                collections: collections,
                height: height,
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
                series: series,
                yAxisPlacement: yAxisPlacement,
                yAxisWidth: yAxisWidth,
            })] }));
};
AxisCollection.propTypes = propTypes$4;
AxisCollection.defaultProps = {
    axisDisplayMode: AXIS_DISPLAY_MODES.ALL,
    collections: [],
    onMouseEnter: null,
    onMouseLeave: null,
    series: [],
    tickFormatter: Number,
    ticks: 5,
    yAxisPlacement: AXIS_PLACEMENTS.RIGHT,
    yAxisWidth: 50,
    zoomable: true,
};
var AxisCollection$1 = withDisplayName('AxisCollection', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var collections = _a.collections, series = _a.series;
        return (jsx(AxisCollection, __assign({}, props, { collections: collections, series: series })));
    } })); });

var RulerTooltip = /** @class */ (function (_super) {
    __extends(RulerTooltip, _super);
    function RulerTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            textWidth: 0,
            textHeight: 0,
        };
        _this.onTooltipRef = function (ref) {
            if (ref) {
                _this.setState({
                    textWidth: ref.getBBox().width,
                    textHeight: ref.getBBox().height,
                });
            }
        };
        return _this;
    }
    RulerTooltip.prototype.render = function () {
        var _a = this.props, labelHeight = _a.labelHeight, color = _a.color, label = _a.label, x = _a.x, y = _a.y, _b = _a.padding, padding = _b === void 0 ? 10 : _b, chartWidth = _a.chartWidth;
        var _c = this.state, textHeight = _c.textHeight, textWidth = _c.textWidth;
        var xTranslate = x + 2 * padding + textWidth > chartWidth
            ? x - padding - padding - textWidth
            : x + padding;
        var height = (labelHeight || textHeight) + padding;
        return (jsxs("g", { transform: "translate(".concat(xTranslate, ", ").concat(y, ")"), style: { cursor: 'default' }, className: "ruler-tooltip", children: [jsx("rect", { className: "ruler-tooltip-fill", fill: "white", width: textWidth + padding, height: height, stroke: color, strokeWidth: "1", strokeOpacity: "0.5", opacity: "0.9", rx: 3, ry: 3 }), jsx("text", { className: "ruler-tooltip-text", textAnchor: "middle", alignmentBaseline: "central", x: (textWidth + padding) / 2, y: height / 2, ref: this.onTooltipRef, style: {
                        fontSize: '14px',
                        color: '#333333',
                        fill: '#333333',
                    }, children: label })] }));
    };
    return RulerTooltip;
}(React.Component));

var labelHeight = 24;
var calculateY = function (points, yTooltipPosition) {
    var pointsObject = {};
    var pointsSorted = __spreadArray([], points, true).sort(function (a, b) { return a.y - b.y; });
    var prevPoint;
    for (var i = 0; i < pointsSorted.length; i += 1) {
        var realSpace = yTooltipPosition - pointsSorted[i].y;
        var neededSpace = (pointsSorted.length - i) * labelHeight;
        // move point upper if no space until the limit available
        if (realSpace < neededSpace) {
            var pointPos = yTooltipPosition - neededSpace;
            // if no upper room available stick it to 0
            prevPoint = pointPos >= 0 ? pointPos : 0;
            // move point lower if it overlaps the previous one
        }
        else if (prevPoint !== undefined &&
            prevPoint + labelHeight > pointsSorted[i].y) {
            prevPoint += labelHeight * 1.5; // offset by 50% more to avoid overlap
        }
        else {
            prevPoint = pointsSorted[i].y;
        }
        pointsObject[pointsSorted[i].name] = prevPoint;
    }
    return pointsObject;
};
var Ruler = function (_a) {
    var ruler = _a.ruler, points = _a.points, chartHeight = _a.chartHeight, chartWidth = _a.chartWidth;
    var _b = ruler.visible, visible = _b === void 0 ? true : _b, _c = ruler.timeLabel, timeLabel = _c === void 0 ? function (_a) {
        var timestamp = _a.timestamp;
        return String(new Date(timestamp));
    } : _c, _d = ruler.yLabel, yLabel = _d === void 0 ? function (_a) {
        var value = _a.value;
        return String(value);
    } : _d, _e = ruler.getTimeLabelPosition, getTimeLabelPosition = _e === void 0 ? function (defaultTimeTooltipPosition) {
        return defaultTimeTooltipPosition;
    } : _e;
    if (!visible) {
        return null;
    }
    var xScale = function (x) { return x; };
    var timeLabelMargin = 5;
    var defaultTimeTooltipPosition = chartHeight - labelHeight - 2 * timeLabelMargin;
    var metadata = { height: chartHeight, labelHeight: labelHeight, timeLabelMargin: timeLabelMargin };
    // The fixed position of a x-axis label which is the same for all highlighted points
    var timeTooltipPosition = getTimeLabelPosition
        ? getTimeLabelPosition(defaultTimeTooltipPosition, metadata)
        : defaultTimeTooltipPosition;
    var pointsObject = calculateY(points, timeTooltipPosition);
    var newestPoint = points.reduce(function (newest, current) {
        if (current.timestamp > newest.timestamp) {
            return current;
        }
        return newest;
    }, points[0]);
    var positionX = xScale(newestPoint.x);
    return (jsxs(Fragment, { children: [jsx("line", { className: "ruler-line", y1: 0, y2: chartHeight, stroke: "#ccc", strokeWidth: "1", x1: positionX, x2: positionX }), jsx(RulerTooltip, { labelHeight: labelHeight, color: newestPoint.color, label: timeLabel(newestPoint), x: positionX, y: timeTooltipPosition, chartWidth: chartWidth }), points.map(function (point) { return [
                jsx(RulerTooltip, { labelHeight: labelHeight, color: point.color, label: yLabel(point), x: xScale(point.x), y: pointsObject[point.name] - labelHeight / 2, chartWidth: chartWidth }, point.name || point.y),
                jsx("circle", { className: "ruler-circle", r: 3, cx: xScale(point.x), cy: point.y, fill: point.color, stroke: point.color, strokeWidth: "3", strokeOpacity: "0.5" }, "circle".concat(point.name || point.y)),
            ]; })] }));
};

var Area = function (_a) {
    var id = _a.id, xMin = _a.xMin, xMax = _a.xMax, yMin = _a.yMin, yMax = _a.yMax, _b = _a.color, color = _b === void 0 ? '#000' : _b, _c = _a.opacity, opacity = _c === void 0 ? 0.15 : _c;
    var width = Math.abs(xMax - xMin);
    var height = Math.abs(yMax - yMin);
    return (jsx("rect", { className: "area area-".concat(id), width: width, height: height, x: xMin, y: yMax, pointerEvents: "none", style: { stroke: color, fill: color, fillOpacity: opacity } }));
};

var ZoomMode = {
    X: 0,
    Y: 1,
    BOTH: 2,
};
var MINIMUM_AREA_DIMENSION_PIXELS = 30;
var isLargeEnough = function (area) {
    return Math.abs(area.start.xpos - area.end.xpos) > MINIMUM_AREA_DIMENSION_PIXELS ||
        Math.abs(area.start.ypos - area.end.ypos) > MINIMUM_AREA_DIMENSION_PIXELS;
};
var InteractionLayer = /** @class */ (function (_super) {
    __extends(InteractionLayer, _super);
    function InteractionLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            area: null,
            crosshair: {
                x: null,
                y: null,
            },
            points: [],
            touchX: null,
            touchY: null,
        };
        _this.onMouseDown = function (e) {
            var onAreaDefined = _this.props.onAreaDefined;
            if (onAreaDefined) {
                _this.mouseDown = true;
                var xpos = e.nativeEvent.offsetX;
                var ypos = e.nativeEvent.offsetY;
                _this.setState({
                    area: {
                        id: Date.now(),
                        start: _this.getDataForCoordinate(xpos, ypos, true),
                    },
                });
            }
        };
        _this.onMouseUp = function () {
            var onAreaDefined = _this.props.onAreaDefined;
            setTimeout(function () {
                _this.mouseUp = false;
                _this.dragging = false;
            }, 50);
            if (onAreaDefined) {
                var area = _this.state.area;
                if (area && area.start && area.end && isLargeEnough(area)) {
                    onAreaDefined(area);
                }
            }
            _this.setState({ area: null });
        };
        _this.onMouseMove = function (e) {
            var _a = _this.props, series = _a.series, onMouseMove = _a.onMouseMove, crosshair = _a.crosshair, ruler = _a.ruler;
            if (series.length === 0) {
                return;
            }
            var xpos = e.nativeEvent.offsetX;
            var ypos = e.nativeEvent.offsetY;
            if (crosshair) {
                _this.setState({
                    crosshair: {
                        x: xpos,
                        y: ypos,
                    },
                });
            }
            var area = _this.state.area;
            if (onMouseMove || (ruler && ruler.visible) || area) {
                _this.processMouseMove(xpos, ypos, e);
                _this.setState({
                    touchX: xpos,
                    touchY: ypos,
                });
                if (area) {
                    _this.dragging = true;
                }
            }
        };
        _this.onMouseOut = function (e) {
            var _a = _this.props, onMouseMove = _a.onMouseMove, crosshair = _a.crosshair, onMouseOut = _a.onMouseOut, ruler = _a.ruler;
            if (crosshair) {
                _this.setState({
                    crosshair: {
                        x: null,
                        y: null,
                    },
                });
            }
            if (ruler && ruler.visible) {
                _this.setState({
                    points: [],
                    touchX: null,
                    touchY: null,
                });
            }
            if (onMouseMove) {
                onMouseMove({ points: [] });
            }
            if (onMouseOut) {
                onMouseOut(e);
            }
            _this.setState({ area: null });
        };
        _this.onClick = function (e) {
            var _a = _this.props, onClickAnnotation = _a.onClickAnnotation, onAreaClicked = _a.onAreaClicked, onClick = _a.onClick, width = _a.width, height = _a.height, annotations = _a.annotations, areas = _a.areas, subDomainsByItemId = _a.subDomainsByItemId, series = _a.series;
            if (_this.dragging) {
                return;
            }
            if (onClickAnnotation || onAreaClicked) {
                var notified_1 = false;
                // FIXME: Don't assume a single time domain
                var timeSubDomain = AXES.time(subDomainsByItemId[Object.keys(subDomainsByItemId)[0]]);
                var xScale_1 = createXScale(timeSubDomain, width);
                var xpos_1 = e.nativeEvent.offsetX;
                var ypos_1 = e.nativeEvent.offsetY;
                var rawTimestamp_1 = xScale_1.invert(xpos_1);
                if (onAreaClicked) {
                    var stopNotifying_1 = false;
                    areas.forEach(function (a) {
                        if (stopNotifying_1) {
                            return;
                        }
                        if (a.seriesId) {
                            var s = series.find(function (s1) { return s1.id === a.seriesId; });
                            if (s) {
                                var _a = subDomainsByItemId[s.collectionId || s.id], _b = AXES.y, ySubDomain = _a[_b];
                                var yScale = createYScale(ySubDomain, height);
                                var unScaled = {
                                    xpos: xScale_1.invert(xpos_1),
                                    ypos: yScale.invert(ypos_1),
                                };
                                var x = unScaled.xpos > a.xMin && unScaled.xpos < a.xMax;
                                var y = unScaled.ypos > a.yMin && unScaled.ypos < a.yMax;
                                if (x && y) {
                                    // Clicked within an area
                                    stopNotifying_1 = onAreaClicked(a, xpos_1, ypos_1);
                                    notified_1 = true;
                                }
                            }
                        }
                    });
                }
                if (onClickAnnotation) {
                    annotations.forEach(function (a) {
                        if (rawTimestamp_1 > a.data[0] && rawTimestamp_1 < a.data[1]) {
                            // Clicked within an annotation
                            onClickAnnotation(a, xpos_1, ypos_1);
                            notified_1 = true;
                        }
                    });
                }
                if (notified_1) {
                    return;
                }
            }
            if (onClick) {
                onClick(e);
            }
        };
        _this.onDoubleClick = function (e) {
            var onDoubleClick = _this.props.onDoubleClick;
            if (onDoubleClick) {
                onDoubleClick(e);
            }
        };
        _this.onTouchMove = function () {
            _this.touchMoving = true;
        };
        _this.onTouchMoveEnd = function () {
            _this.touchMoving = false;
        };
        // TODO: This extrapolate thing is super gross and so hacky.
        _this.getDataForCoordinate = function (xpos, ypos, extrapolate) {
            if (extrapolate === void 0) { extrapolate = false; }
            var _a = _this.props, subDomainsByItemId = _a.subDomainsByItemId, width = _a.width, series = _a.series, height = _a.height;
            var output = { xpos: xpos, ypos: ypos, points: [] };
            series.forEach(function (s) {
                var _a = subDomainsByItemId[s.id], _b = AXES.time, timeSubDomain = _a[_b], _c = AXES.y, ySubDomain = _a[_c];
                var xScale = createXScale(timeSubDomain, width);
                var rawTimestamp = xScale.invert(xpos);
                var data = s.data, xAccessor = s.xAccessor, yAccessor = s.yAccessor;
                var rawX = bisector(xAccessor).left(data, rawTimestamp, 1);
                var x0 = data[rawX - 1];
                var x1 = data[rawX];
                var d = null;
                if (x0) {
                    // If there is a point *before* the cursor position, then that should
                    // be used since it was the last-known value, and extrapolating into the
                    // future can be misleading (and incorrect).
                    d = x0;
                }
                else if (x1) {
                    // But if we only have a point under the cursor, go ahead and use that.
                    d = x1;
                }
                else {
                    // Otherwise, just use nothing.
                    d = null;
                }
                if (d) {
                    var yScale = createYScale(ySubDomain, height);
                    if (extrapolate) {
                        yScale = scaleLinear()
                            .domain([height, 0])
                            .range(ySubDomain);
                    }
                    var ts = xAccessor(d);
                    var value = extrapolate ? ypos : yAccessor(d);
                    output.points.push({
                        id: s.id,
                        timestamp: ts,
                        value: extrapolate ? yScale(value) : value,
                        x: xScale(ts),
                        y: yScale(value),
                    });
                }
                else {
                    output.points.push({ id: s.id });
                }
            });
            return output;
        };
        _this.getRulerPoints = function (xpos) {
            var _a = _this.props, series = _a.series, height = _a.height, width = _a.width, subDomainsByItemId = _a.subDomainsByItemId;
            var newPoints = [];
            series.forEach(function (s) {
                if (!subDomainsByItemId[s.id]) {
                    return;
                }
                var _a = subDomainsByItemId[s.collectionId] || subDomainsByItemId[s.id], _b = AXES.time, timeSubDomain = _a[_b], _c = AXES.y, ySubDomain = _a[_c];
                var xScale = createXScale(timeSubDomain, width);
                var rawTimestamp = xScale.invert(xpos);
                var data = s.data, xAccessor = s.xAccessor, yAccessor = s.yAccessor;
                var rawX = bisector(xAccessor).left(data, rawTimestamp, 1);
                var x0 = data[rawX - 1];
                var x1 = data[rawX];
                var d = null;
                if (x0) {
                    // If there is a point *before* the cursor position, then that should
                    // be used since it was the last-known value, and extrapolating into the
                    // future can be misleading (and incorrect).
                    d = x0;
                }
                else if (x1) {
                    // But if we only have a point under the cursor, go ahead and use that.
                    d = x1;
                }
                else {
                    // Otherwise, just use nothing.
                    d = null;
                }
                if (d) {
                    var yScale = createYScale(ySubDomain, height);
                    var ts = xAccessor(d);
                    var value = yAccessor(d);
                    newPoints.push({
                        id: s.id,
                        name: s.name,
                        color: s.color,
                        timestamp: ts,
                        rawTimestamp: rawTimestamp,
                        value: value,
                        x: xScale(ts),
                        y: yScale(value),
                    });
                }
            });
            return newPoints;
        };
        _this.setRulerPosition = function (timestamp) {
            if (!timestamp) {
                _this.setState({
                    points: [],
                    touchX: null,
                    touchY: null,
                });
                return;
            }
            var _a = _this.props, width = _a.width, subDomainsByItemId = _a.subDomainsByItemId;
            var timeSubDomain = AXES.time(subDomainsByItemId[Object.keys(subDomainsByItemId)[0]]);
            var xScale = createXScale(timeSubDomain, width);
            var xpos = xScale(timestamp);
            _this.setRulerPoints(xpos);
            _this.setState({
                touchX: xpos,
            });
        };
        _this.setRulerPoints = function (xpos) {
            var rulerPoints = _this.getRulerPoints(xpos);
            _this.setState({ points: rulerPoints });
            return rulerPoints;
        };
        _this.setArea = function (xpos, ypos) {
            var area = _this.state.area;
            if (!area) {
                return;
            }
            var output = _this.getDataForCoordinate(xpos, ypos, true);
            _this.setState({
                area: __assign(__assign({}, area), { end: output }),
            });
        };
        _this.processMouseMove = function (xpos, ypos, e) {
            if (e === void 0) { e = null; }
            var rulerPoints = _this.setRulerPoints(xpos);
            _this.setArea(xpos, ypos);
            var onMouseMove = _this.props.onMouseMove;
            if (onMouseMove) {
                onMouseMove({ points: rulerPoints, xpos: xpos, ypos: ypos, e: e });
            }
        };
        return _this;
    }
    InteractionLayer.prototype.componentDidMount = function () {
        var ruler = this.props.ruler;
        if (ruler.timestamp) {
            this.setRulerPosition(ruler.timestamp);
        }
    };
    InteractionLayer.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var _a = this.props, onAreaDefined = _a.onAreaDefined, ruler = _a.ruler, subDomainsByItemId = _a.subDomainsByItemId, width = _a.width;
        var prevSubDomainsByItemId = prevProps.subDomainsByItemId, prevWidth = prevProps.width;
        if (prevProps.onAreaDefined && !onAreaDefined) {
            // They no longer care about areas; if we're building one, then remove it.
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                area: null,
            });
        }
        if (ruler.timestamp !== prevProps.ruler.timestamp) {
            this.setRulerPosition(ruler.timestamp);
        }
        // Keep track of ruler position on subdomain/width update.
        // FIXME: Don't assume a single time domain
        var _b = this.state, touchX = _b.touchX, touchY = _b.touchY;
        var prevTimeSubDomain = AXES.time(prevSubDomainsByItemId[Object.keys(prevSubDomainsByItemId)[0]]);
        var nextTimeSubDomain = AXES.time(subDomainsByItemId[Object.keys(subDomainsByItemId)[0]]);
        if (ruler &&
            ruler.visible &&
            touchX !== null &&
            (!isEqual$1(prevTimeSubDomain, nextTimeSubDomain) || prevWidth !== width)) {
            var prevXScale = createXScale(prevTimeSubDomain, prevWidth);
            var curXScale = createXScale(nextTimeSubDomain, width);
            var ts = prevXScale.invert(touchX);
            var newXPos_1 = curXScale(ts);
            // hide ruler if point went out to the left of subdomain
            if (newXPos_1 < 0) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    points: [],
                    touchX: null,
                    touchY: null,
                });
            }
            else if (this.touchMoving) {
                // ruler should not follow points during panning and zooming on mobile
                this.processMouseMove(touchX, touchY);
            }
            else {
                // ruler should follow points during live loading and
                // panning and zooming on desktop
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ touchX: newXPos_1 }, function () {
                    _this.processMouseMove(newXPos_1, touchY);
                });
            }
        }
    };
    InteractionLayer.prototype.render = function () {
        var _a = this.props, propsAnnotations = _a.annotations, propsAreas = _a.areas, collections = _a.collections, height = _a.height, crosshair = _a.crosshair, onAreaDefined = _a.onAreaDefined, ruler = _a.ruler, series = _a.series, subDomainsByItemId = _a.subDomainsByItemId, width = _a.width, zoomAxes = _a.zoomAxes;
        if (series.length === 0) {
            return null;
        }
        var _b = this.state, _c = _b.crosshair, x = _c.x, y = _c.y, points = _b.points, area = _b.area;
        var lines = null;
        if (crosshair && x !== null && y !== null) {
            lines = (jsxs(Fragment, { children: [jsx("line", { x1: 0, x2: width, stroke: "#0004", strokeWidth: 1, y1: y, y2: y }, "x"), jsx("line", { y1: 0, y2: height, stroke: "#0004", strokeWidth: 1, x1: x, x2: x }, "y")] }));
        }
        // FIXME: Don't rely on a single time domain
        var timeSubDomain = AXES.time(subDomainsByItemId[series[0].id]);
        var xScale = createXScale(timeSubDomain, width);
        var annotations = propsAnnotations.map(function (a) { return (jsx(Annotation, __assign({}, a, { height: height, xScale: xScale }), "annotation-".concat(a.id))); });
        var areas = propsAreas.map(function (a) {
            var scaledArea = __assign({}, a);
            var s = null;
            scaledArea.xMin = Math.max(0, xScale(a.xMin !== undefined ? a.xMin : timeSubDomain[0]));
            scaledArea.xMax = xScale(a.xMax !== undefined ? a.xMax : timeSubDomain[1]);
            if (a.seriesId) {
                s = series.find(function (s1) { return s1.id === a.seriesId; });
                if (s) {
                    var _a = subDomainsByItemId[s.collectionId || s.id], _b = AXES.y, ySubDomain = _a[_b];
                    var yScale = createYScale(ySubDomain, height);
                    scaledArea.yMin = Math.max(0, yScale(a.yMin !== undefined ? a.yMin : ySubDomain[0]));
                    scaledArea.yMax = yScale(a.yMax !== undefined ? a.yMax : ySubDomain[1]);
                }
            }
            var color = scaledArea.color || (s ? s.color : null);
            return (jsx(Area, __assign({ color: color }, scaledArea), "area-".concat(scaledArea.id)));
        });
        var areaBeingDefined = area ? (jsx(Area, __assign({}, area, { color: "#999" }), "user")) : null;
        var zoomableAxes = zoomAxes;
        if (onAreaDefined) {
            zoomableAxes = {};
        }
        return (jsxs(Fragment, { children: [lines, annotations, ruler.visible && points.length && (jsx(Ruler, { ruler: ruler, points: points, chartWidth: width, chartHeight: height })), areas, areaBeingDefined, jsx(ZoomRect$1, { zoomAxes: zoomableAxes, width: width, height: height, onClick: this.onClick, onMouseMove: this.onMouseMove, onBlur: this.onMouseMove, onMouseOut: this.onMouseOut, onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp, onDoubleClick: this.onDoubleClick, itemIds: series.map(function (s) { return s.id; }).concat(collections.map(function (c) { return c.id; })), onTouchMove: this.onTouchMove, onTouchMoveEnd: this.onTouchMoveEnd })] }));
    };
    return InteractionLayer;
}(React.Component));
InteractionLayer.propTypes = {
    crosshair: PropTypes.bool,
    ruler: rulerPropType,
    height: PropTypes.number.isRequired,
    // area => void
    onAreaDefined: PropTypes.func,
    // (area, xpos, ypos) => void
    onAreaClicked: PropTypes.func,
    onClick: PropTypes.func,
    onClickAnnotation: PropTypes.func,
    // event => void
    onDoubleClick: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    // ({ xSubDomain, transformation }) => void
    onZoomXAxis: PropTypes.func,
    areas: PropTypes.arrayOf(areaPropType),
    annotations: PropTypes.arrayOf(annotationPropType),
    width: PropTypes.number.isRequired,
    zoomAxes: GriffPropTypes.zoomAxes.isRequired,
    // These are all populated by Griff.
    series: seriesPropType,
    collections: GriffPropTypes.collections,
    subDomainsByItemId: GriffPropTypes.subDomainsByItemId.isRequired,
};
InteractionLayer.defaultProps = {
    areas: [],
    annotations: [],
    collections: [],
    crosshair: false,
    onAreaDefined: null,
    onAreaClicked: null,
    onClick: null,
    onClickAnnotation: null,
    onDoubleClick: null,
    onMouseMove: null,
    onMouseOut: null,
    onZoomXAxis: null,
    series: [],
    ruler: {
        visible: false,
        timeLabel: function () { },
        yLabel: function () { },
        timestamp: null,
    },
};
var InteractionLayer$1 = withDisplayName('InteractionLayer', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var collections = _a.collections, series = _a.series, subDomainsByItemId = _a.subDomainsByItemId;
        return (jsx(InteractionLayer, __assign({}, props, { collections: collections, series: series, subDomainsByItemId: subDomainsByItemId })));
    } })); });

var _a, _b, _c, _d;
var propTypes$5 = {
    contextChart: PropTypes.node,
    lineChart: PropTypes.node.isRequired,
    xAxis: PropTypes.node.isRequired,
    xAxisPlacement: GriffPropTypes.axisPlacement,
    yAxis: PropTypes.node.isRequired,
    yAxisPlacement: GriffPropTypes.axisPlacement,
};
var defaultProps$3 = {
    xAxisPlacement: AXIS_PLACEMENTS.BOTTOM,
    yAxisPlacement: AXIS_PLACEMENTS.RIGHT,
    contextChart: null,
};
var xAxisContainer = function (area) { return function (axis, placement) { return (jsx("div", { className: "x-axis-container", style: {
        gridArea: area,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    }, children: React.cloneElement(axis, { placement: placement }) }, area)); }; };
var yAxisContainer = function (area) { return function (axis, placement) { return (jsx("div", { className: "y-axis-container", style: {
        gridArea: area,
        display: 'flex',
        flexDirection: 'column',
    }, children: React.cloneElement(axis, { yAxisPlacement: placement }) }, area)); }; };
var XY_GRIDS = (_a = {},
    _a[AXIS_PLACEMENTS.BOTH] = (_b = {},
        _b[AXIS_PLACEMENTS.BOTH] = [
            // formatting for readability
            '. xaxis-top .',
            'yaxis-left chart yaxis-right',
            '. xaxis-bottom .',
            '. context .',
        ],
        _b[AXIS_PLACEMENTS.LEFT] = [
            // formatting for readability
            '. xaxis-top',
            'yaxis chart',
            '. xaxis-bottom',
            '. context',
        ],
        _b[AXIS_PLACEMENTS.RIGHT] = [
            // formatting for readability
            'xaxis-top .',
            'chart yaxis',
            'xaxis-bottom .',
            'context .',
        ],
        _b),
    _a[AXIS_PLACEMENTS.BOTTOM] = (_c = {},
        _c[AXIS_PLACEMENTS.BOTH] = [
            // formatting for readability
            'yaxis-left chart yaxis-right',
            '. xaxis .',
            '. context .',
        ],
        _c[AXIS_PLACEMENTS.LEFT] = [
            // formatting for readability
            'yaxis chart',
            '. xaxis',
            '. context',
        ],
        _c[AXIS_PLACEMENTS.RIGHT] = [
            // formatting for readability
            'chart yaxis',
            'xaxis .',
            'context .',
        ],
        _c),
    _a[AXIS_PLACEMENTS.TOP] = (_d = {},
        _d[AXIS_PLACEMENTS.BOTH] = [
            // formatting for readability
            '. xaxis .',
            'yaxis-left chart yaxis-right',
            '. context .',
        ],
        _d[AXIS_PLACEMENTS.LEFT] = [
            // formatting for readability
            '. xaxis',
            'yaxis chart',
            '. context',
        ],
        _d[AXIS_PLACEMENTS.RIGHT] = [
            // formatting for readability
            'xaxis .',
            'chart yaxis',
            'context .',
        ],
        _d),
    _a);
var Layout = function (_a) {
    var contextChart = _a.contextChart, lineChart = _a.lineChart, xAxis = _a.xAxis, xAxisPlacement = _a.xAxisPlacement, yAxis = _a.yAxis, yAxisPlacement = _a.yAxisPlacement;
    var xAxes = [];
    var yAxes = [];
    var areas = (XY_GRIDS[xAxisPlacement][yAxisPlacement] ||
        XY_GRIDS[AXIS_PLACEMENTS.BOTTOM][AXIS_PLACEMENTS.RIGHT])
        .map(function (s) { return "'".concat(s, "'"); })
        .join(' ');
    var gridTemplateSpec = function (axisPlacement) {
        switch (axisPlacement) {
            case AXIS_PLACEMENTS.BOTH:
                return 'auto 1fr auto auto';
            case AXIS_PLACEMENTS.LEFT:
            case AXIS_PLACEMENTS.TOP:
                return 'auto 1fr auto';
            default:
                return '1fr auto auto';
        }
    };
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.BOTH: {
            yAxes.push(yAxisContainer('yaxis-left')(yAxis, AXIS_PLACEMENTS.LEFT));
            yAxes.push(yAxisContainer('yaxis-right')(yAxis, AXIS_PLACEMENTS.RIGHT));
            break;
        }
        case AXIS_PLACEMENTS.LEFT:
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            yAxes.push(yAxisContainer('yaxis')(yAxis, yAxisPlacement));
            break;
    }
    switch (xAxisPlacement) {
        case AXIS_PLACEMENTS.BOTH: {
            xAxes.push(xAxisContainer('xaxis-top')(xAxis, AXIS_PLACEMENTS.TOP));
            xAxes.push(xAxisContainer('xaxis-bottom')(xAxis, AXIS_PLACEMENTS.BOTTOM));
            break;
        }
        case AXIS_PLACEMENTS.TOP:
        case AXIS_PLACEMENTS.BOTTOM:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            xAxes.push(xAxisContainer('xaxis')(xAxis, xAxisPlacement));
            break;
    }
    return (jsxs("div", { className: "linechart-container", style: {
            display: 'grid',
            gridTemplateAreas: areas,
            gridTemplateRows: gridTemplateSpec(xAxisPlacement),
            gridTemplateColumns: gridTemplateSpec(yAxisPlacement),
            height: '100%',
        }, children: [jsx("div", { className: "lines-container", style: {
                    gridArea: 'chart',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }, children: lineChart }), yAxes, xAxes, jsx("div", { style: { gridArea: 'spacer' } }), contextChart && (jsx("div", { className: "context-container", style: {
                    gridArea: 'context',
                    display: 'flex',
                    flexDirection: 'column',
                }, children: contextChart }))] }));
};
Layout.propTypes = propTypes$5;
Layout.defaultProps = defaultProps$3;

var propTypes$6 = {
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
var getXAxisHeight = function (xAxisHeight, xAxisPlacement) {
    switch (xAxisPlacement) {
        case AXIS_PLACEMENTS.BOTH:
            return xAxisHeight * 2;
        case AXIS_PLACEMENTS.TOP:
        case AXIS_PLACEMENTS.BOTTOM:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            return xAxisHeight;
    }
};
var getContextChartHeight = function (_a) {
    var contextChart = _a.contextChart, xAxisHeight = _a.xAxisHeight, xAxisPlacement = _a.xAxisPlacement;
    if (!contextChart || contextChart.visible === false || !contextChart.height) {
        // No context chart to show.
        return 0;
    }
    return getXAxisHeight(xAxisHeight, xAxisPlacement) + contextChart.height;
};
var getYAxisCollectionWidth = function (placement, _a) {
    var collections = _a.collections, series = _a.series, yAxisDisplayMode = _a.yAxisDisplayMode, yAxisPlacement = _a.yAxisPlacement, yAxisWidth = _a.yAxisWidth;
    var displayModeFilter = function (mode) { return function (item) {
        return (item.yAxisDisplayMode || yAxisDisplayMode) === mode;
    }; };
    var filteredItems = []
        .concat(series)
        .concat(collections)
        .filter(function (item) {
        var finalYAxisPlacement = item.yAxisPlacement || yAxisPlacement;
        return (!item.hidden &&
            item.collectionId === undefined &&
            (finalYAxisPlacement === AXIS_PLACEMENTS.BOTH ||
                finalYAxisPlacement === placement));
    });
    var hasCollapsed = filteredItems.filter(displayModeFilter(AXIS_DISPLAY_MODES.COLLAPSED)).length >
        0;
    var isDisplayModeALL = displayModeFilter(AXIS_DISPLAY_MODES.ALL);
    return filteredItems.reduce(function (totalWidth, item) {
        if (!isDisplayModeALL(item)) {
            return totalWidth;
        }
        // COLLAPSED items are already accounted-for with the initial value.
        if (item.yAxisDisplayMode === AXIS_DISPLAY_MODES.COLLAPSED) {
            return totalWidth;
        }
        return totalWidth + yAxisWidth;
    }, hasCollapsed ? yAxisWidth : 0);
};
var getYAxisPlacement = function (_a) {
    var collections = _a.collections, series = _a.series, yAxisPlacement = _a.yAxisPlacement;
    var yAxisPlacements = []
        .concat(series.filter(function (s) { return s.collectionId === undefined; }))
        .concat(collections)
        .reduce(function (acc, item) {
        var placement = item.yAxisPlacement || yAxisPlacement;
        if (placement) {
            acc[placement] = (acc[placement] || 0) + 1;
        }
        return acc;
    }, {});
    if (yAxisPlacements[AXIS_PLACEMENTS.BOTH]) {
        return AXIS_PLACEMENTS.BOTH;
    }
    if (yAxisPlacements[AXIS_PLACEMENTS.LEFT] &&
        yAxisPlacements[AXIS_PLACEMENTS.RIGHT]) {
        return AXIS_PLACEMENTS.BOTH;
    }
    if (yAxisPlacements[AXIS_PLACEMENTS.LEFT]) {
        return AXIS_PLACEMENTS.LEFT;
    }
    return yAxisPlacement || AXIS_PLACEMENTS.RIGHT;
};
var LineChart = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.annotations, annotations = _b === void 0 ? [] : _b, _c = _a.areas, areas = _c === void 0 ? [] : _c, _d = _a.children, children = _d === void 0 ? [] : _d, _e = _a.contextChart, contextChart = _e === void 0 ? { visible: true, height: 100, isDefault: true } : _e, _f = _a.crosshair, crosshair = _f === void 0 ? true : _f, _g = _a.height, propHeight = _g === void 0 ? 0 : _g, _h = _a.onAreaDefined, onAreaDefined = _h === void 0 ? null : _h, _j = _a.onAreaClicked, onAreaClicked = _j === void 0 ? null : _j, _k = _a.onAxisMouseEnter, onAxisMouseEnter = _k === void 0 ? null : _k, _l = _a.onAxisMouseLeave, onAxisMouseLeave = _l === void 0 ? null : _l, _m = _a.onClick, onClick = _m === void 0 ? null : _m, _o = _a.onZoomXAxis, onZoomXAxis = _o === void 0 ? null : _o, _p = _a.onClickAnnotation, onClickAnnotation = _p === void 0 ? null : _p, _q = _a.onDoubleClick, onDoubleClick = _q === void 0 ? null : _q, _r = _a.onMouseMove, onMouseMove = _r === void 0 ? null : _r, _s = _a.onMouseOut, onMouseOut = _s === void 0 ? null : _s, _t = _a.onBlur, onBlur = _t === void 0 ? null : _t, _u = _a.pointWidth, pointWidth = _u === void 0 ? 6 : _u, size = _a.size, _v = _a.xSubDomain, xSubDomain = _v === void 0 ? [] : _v, _w = _a.ruler, ruler = _w === void 0 ? {
        visible: false,
        timeLabel: function () { },
        yLabel: function () { },
        timestamp: null,
    } : _w, _x = _a.width, propWidth = _x === void 0 ? 0 : _x, _y = _a.xAxisHeight, xAxisHeight = _y === void 0 ? 50 : _y, _z = _a.xAxisFormatter, xAxisFormatter = _z === void 0 ? multiFormat : _z, _0 = _a.xAxisPlacement, xAxisPlacement = _0 === void 0 ? AXIS_PLACEMENTS.BOTTOM : _0, _1 = _a.yAxisDisplayMode, yAxisDisplayMode = _1 === void 0 ? AXIS_DISPLAY_MODES.ALL : _1, _2 = _a.yAxisFormatter, yAxisFormatter = _2 === void 0 ? Number : _2, _3 = _a.yAxisWidth, yAxisWidth = _3 === void 0 ? 50 : _3, _4 = _a.yAxisTicks, yAxisTicks = _4 === void 0 ? null : _4, _5 = _a.zoomable, zoomable = _5 === void 0 ? true : _5, props = __rest(_a, ["annotations", "areas", "children", "contextChart", "crosshair", "height", "onAreaDefined", "onAreaClicked", "onAxisMouseEnter", "onAxisMouseLeave", "onClick", "onZoomXAxis", "onClickAnnotation", "onDoubleClick", "onMouseMove", "onMouseOut", "onBlur", "pointWidth", "size", "xSubDomain", "ruler", "width", "xAxisHeight", "xAxisFormatter", "xAxisPlacement", "yAxisDisplayMode", "yAxisFormatter", "yAxisWidth", "yAxisTicks", "zoomable"]);
    if (!size) {
        // Can't proceed without a size; just abort until react-sizeme feeds it
        // to the component.
        return null;
    }
    var sizeWidth = size.width, sizeHeight = size.height;
    var width = propWidth || sizeWidth;
    var height = propHeight || sizeHeight;
    var propsForHelpers = __assign(__assign({}, props), { contextChart: contextChart, xAxisHeight: xAxisHeight, xAxisPlacement: xAxisPlacement, yAxisDisplayMode: yAxisDisplayMode, yAxisWidth: yAxisWidth });
    var contextChartSpace = getContextChartHeight(propsForHelpers);
    var chartWidth = width -
        getYAxisCollectionWidth(AXIS_PLACEMENTS.LEFT, propsForHelpers) -
        getYAxisCollectionWidth(AXIS_PLACEMENTS.RIGHT, propsForHelpers) -
        getYAxisCollectionWidth(undefined, propsForHelpers);
    var chartHeight = height - getXAxisHeight(xAxisHeight) - contextChartSpace;
    var chartSize = {
        width: Math.max(0, chartWidth),
        height: Math.max(0, chartHeight),
    };
    return (jsx(Layout, { xAxisPlacement: xAxisPlacement, yAxisPlacement: getYAxisPlacement(propsForHelpers), lineChart: jsxs("svg", { width: chartSize.width, height: chartSize.height, children: [React.Children.map(children, function (child) {
                    var _a;
                    var childProps = __assign(__assign({}, chartSize), { axes: __assign(__assign({}, (child.props || {}).axes), (_a = {}, _a[AXES.x] = ((child.props || {}).axes || {}).x === undefined
                            ? String(AXES.time)
                            : child.props.axes.x, _a)) });
                    return React.cloneElement(child, childProps);
                }), jsx(LineCollection$1, { height: chartSize.height, width: chartSize.width, pointWidth: pointWidth }), // sizeMe can cause chartSize.width to be < 0, which causes
                // problems for the position of the ruler in InteractionLayer
                chartSize.width > 0 && (jsx(InteractionLayer$1, { height: chartSize.height, width: chartSize.width, crosshair: crosshair, onMouseMove: onMouseMove, onMouseOut: onMouseOut, onBlur: onBlur, onClickAnnotation: onClickAnnotation, onDoubleClick: onDoubleClick, ruler: ruler, annotations: annotations, onClick: onClick, areas: areas, onAreaDefined: onAreaDefined, onZoomXAxis: onZoomXAxis, onAreaClicked: onAreaClicked, zoomAxes: { time: zoomable } }))] }), yAxis: jsx(AxisCollection$1, { zoomable: zoomable, axisDisplayMode: yAxisDisplayMode, onMouseEnter: onAxisMouseEnter, onMouseLeave: onAxisMouseLeave, height: chartSize.height, tickFormatter: yAxisFormatter, yAxisWidth: yAxisWidth, ticks: yAxisTicks }), xAxis: jsx(XAxis$1, { width: chartSize.width, domain: xSubDomain, height: xAxisHeight, placement: xAxisPlacement, tickFormatter: xAxisFormatter }), contextChart: contextChart.visible && (jsx(ContextChart$1, { width: chartSize.width, height: contextChartSpace, zoomable: zoomable, annotations: annotations, xAxisFormatter: xAxisFormatter, xAxisHeight: xAxisHeight, xAxisPlacement: xAxisPlacement })) }));
};
LineChart.propTypes = propTypes$6;
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
        timeLabel: function () { },
        yLabel: function () { },
        timestamp: null,
    },
    width: 0,
    xAxisFormatter: multiFormat,
    xAxisHeight: 50,
    xAxisPlacement: AXIS_PLACEMENTS.BOTTOM,
    xSubDomain: [],
    yAxisDisplayMode: AXIS_DISPLAY_MODES.ALL,
    yAxisFormatter: Number,
    yAxisTicks: null,
    yAxisWidth: 50,
    zoomable: true,
};
var SizedLineChart = function (_a) {
    var explicitSize = _a.size, rest = __rest(_a, ["size"]);
    var _b = useResizeDetector(), ref = _b.ref, width = _b.width, height = _b.height;
    var size = explicitSize || { width: width || 0, height: height || 0 };
    return (jsx("div", { ref: ref, style: { width: '100%', height: '100%' }, children: jsx(LineChart, __assign({}, rest, { size: size })) }));
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
var index$1 = withDisplayName('LineChart', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var collections = _a.collections, series = _a.series;
        return (jsx(SizedLineChart, __assign({}, props, { collections: collections, series: series })));
    } })); });

var PointCollection = function (_a) {
    var width = _a.width, height = _a.height, series = _a.series, subDomainsByItemId = _a.subDomainsByItemId;
    var points = series
        .filter(function (s) { return !s.hidden && s.drawPoints !== false; })
        .map(function (s) {
        // TODO: We can't use [s.collectionId || s.id] on the x axis. I'm not
        // entirely sure why; I think it's because the collection's x domain is not
        // correctly calculated to the data's extent. I have not looked into it
        // because it doesn't really matter yet, but it will at some point.
        var xScale = createXScale(AXES.x(subDomainsByItemId[s.id]), width);
        var yScale = createYScale(AXES.y(subDomainsByItemId[s.collectionId || s.id]), height);
        // Only show points which are relevant for the current time subdomain.
        // We don't need to do this for lines because we want lines to be drawn to
        // infinity so that they go to the ends of the graph, but points are special
        // since they can overlap in the [x,y] plane, but not be in the current time
        // subdomain.
        var pointFilter = function (d, i, arr) {
            var timestamp = s.timeAccessor(d, i, arr);
            var subDomain = AXES.time(subDomainsByItemId[s.id]);
            return subDomain[0] <= timestamp && timestamp <= subDomain[1];
        };
        return (jsx(Points, __assign({}, s, { xScale: xScale, yScale: yScale, pointFilter: pointFilter }), s.id));
    });
    return (jsxs("g", { width: width, height: height, children: [jsx("clipPath", { id: "scatterplot-clip-path-".concat(series.map(function (s) { return s.id; }).join('-')), children: jsx("rect", { width: width, height: height, fill: "none" }) }), points] }));
};
var PointCollection$1 = withDisplayName('PointCollection', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var subDomainsByItemId = _a.subDomainsByItemId, series = _a.series;
        return (jsx(PointCollection, __assign({}, props, { series: series, subDomainsByItemId: subDomainsByItemId })));
    } })); });

var _a$1, _b$1, _c$1, _d$1;
var propTypes$7 = {
    chart: PropTypes.node.isRequired,
    xAxis: PropTypes.node.isRequired,
    xAxisPlacement: GriffPropTypes.axisPlacement,
    yAxis: PropTypes.node.isRequired,
    yAxisPlacement: GriffPropTypes.axisPlacement,
};
var defaultProps$4 = {
    xAxisPlacement: AXIS_PLACEMENTS.BOTTOM,
    yAxisPlacement: AXIS_PLACEMENTS.RIGHT,
};
var xAxisContainer$1 = function (area) { return function (axis, placement) { return (jsx("div", { className: "x-axis-container", style: {
        gridArea: area,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    }, children: React.cloneElement(axis, { placement: placement }) }, area)); }; };
var yAxisContainer$1 = function (area) { return function (axis, placement) { return (jsx("div", { className: "y-axis-container", style: {
        gridArea: area,
        display: 'flex',
        flexDirection: 'column',
    }, children: React.cloneElement(axis, { yAxisPlacement: placement }) }, area)); }; };
var XY_GRIDS$1 = (_a$1 = {},
    _a$1[AXIS_PLACEMENTS.BOTH] = (_b$1 = {},
        _b$1[AXIS_PLACEMENTS.BOTH] = [
            // formatting for readability
            '. xaxis-top .',
            'yaxis-left chart yaxis-right',
            '. xaxis-bottom .',
        ],
        _b$1[AXIS_PLACEMENTS.LEFT] = [
            // formatting for readability
            '. xaxis-top',
            'yaxis chart',
            '. xaxis-bottom',
        ],
        _b$1[AXIS_PLACEMENTS.RIGHT] = [
            // formatting for readability
            'xaxis-top .',
            'chart yaxis',
            'xaxis-bottom .',
        ],
        _b$1),
    _a$1[AXIS_PLACEMENTS.BOTTOM] = (_c$1 = {},
        _c$1[AXIS_PLACEMENTS.BOTH] = [
            // formatting for readability
            'yaxis-left chart yaxis-right',
            '. xaxis .',
        ],
        _c$1[AXIS_PLACEMENTS.LEFT] = [
            // formatting for readability
            'yaxis chart',
            '. xaxis',
        ],
        _c$1[AXIS_PLACEMENTS.RIGHT] = [
            // formatting for readability
            'chart yaxis',
            'xaxis .',
        ],
        _c$1),
    _a$1[AXIS_PLACEMENTS.TOP] = (_d$1 = {},
        _d$1[AXIS_PLACEMENTS.BOTH] = [
            // formatting for readability
            '. xaxis .',
            'yaxis-left chart yaxis-right',
        ],
        _d$1[AXIS_PLACEMENTS.LEFT] = [
            // formatting for readability
            '. xaxis',
            'yaxis chart',
        ],
        _d$1[AXIS_PLACEMENTS.RIGHT] = [
            // formatting for readability
            'xaxis .',
            'chart yaxis',
        ],
        _d$1),
    _a$1);
var Layout$1 = function (_a) {
    var chart = _a.chart, xAxis = _a.xAxis, xAxisPlacement = _a.xAxisPlacement, yAxis = _a.yAxis, yAxisPlacement = _a.yAxisPlacement;
    var xAxes = [];
    var yAxes = [];
    var areas = (XY_GRIDS$1[xAxisPlacement][yAxisPlacement] ||
        XY_GRIDS$1[AXIS_PLACEMENTS.BOTTOM][AXIS_PLACEMENTS.RIGHT])
        .map(function (s) { return "'".concat(s, "'"); })
        .join(' ');
    var gridTemplateSpec = function (axisPlacement) {
        switch (axisPlacement) {
            case AXIS_PLACEMENTS.BOTH:
                return 'auto 1fr auto';
            case AXIS_PLACEMENTS.LEFT:
            case AXIS_PLACEMENTS.TOP:
                return 'auto 1fr';
            default:
                return '1fr auto';
        }
    };
    switch (yAxisPlacement) {
        case AXIS_PLACEMENTS.BOTH: {
            yAxes.push(yAxisContainer$1('yaxis-left')(yAxis, AXIS_PLACEMENTS.LEFT));
            yAxes.push(yAxisContainer$1('yaxis-right')(yAxis, AXIS_PLACEMENTS.RIGHT));
            break;
        }
        case AXIS_PLACEMENTS.LEFT:
        case AXIS_PLACEMENTS.RIGHT:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            yAxes.push(yAxisContainer$1('yaxis')(yAxis, yAxisPlacement));
            break;
    }
    switch (xAxisPlacement) {
        case AXIS_PLACEMENTS.BOTH: {
            xAxes.push(xAxisContainer$1('xaxis-top')(xAxis, AXIS_PLACEMENTS.TOP));
            xAxes.push(xAxisContainer$1('xaxis-bottom')(xAxis, AXIS_PLACEMENTS.BOTTOM));
            break;
        }
        case AXIS_PLACEMENTS.TOP:
        case AXIS_PLACEMENTS.BOTTOM:
        case AXIS_PLACEMENTS.UNSPECIFIED:
        default:
            xAxes.push(xAxisContainer$1('xaxis')(xAxis, xAxisPlacement));
            break;
    }
    return (jsxs("div", { className: "scatterplot-container", style: {
            display: 'grid',
            gridTemplateAreas: areas,
            gridTemplateColumns: gridTemplateSpec(yAxisPlacement),
            gridTemplateRows: gridTemplateSpec(xAxisPlacement),
            height: '100%',
        }, children: [jsx("div", { className: "chart-container", style: { gridArea: 'chart', height: '100%' }, children: chart }), yAxes, xAxes] }));
};
Layout$1.propTypes = propTypes$7;
Layout$1.defaultProps = defaultProps$4;

var propTypes$8 = {
    size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired,
    zoomable: PropTypes.bool,
    onClick: PropTypes.func,
    // Number => String
    xAxisFormatter: PropTypes.func,
    xAxisPlacement: GriffPropTypes.axisPlacement,
    xAxisTicks: PropTypes.number,
    // Number => String
    yAxisFormatter: PropTypes.func,
    yAxisPlacement: GriffPropTypes.axisPlacement,
    yAxisTicks: PropTypes.number,
    collections: GriffPropTypes.collections.isRequired,
    series: seriesPropType.isRequired,
    xAxisHeight: PropTypes.number,
    yAxisWidth: PropTypes.number,
    // The following props are all supplied internally (eg, by React).
    children: PropTypes.arrayOf(PropTypes.node),
};
var defaultProps$5 = {
    zoomable: true,
    onClick: null,
    xAxisFormatter: Number,
    xAxisPlacement: AXIS_PLACEMENTS.BOTTOM,
    xAxisTicks: null,
    yAxisFormatter: Number,
    yAxisPlacement: AXIS_PLACEMENTS.RIGHT,
    yAxisTicks: null,
    xAxisHeight: 50,
    yAxisWidth: 50,
    children: [],
};
var getYAxisPlacement$1 = function (_a) {
    var collections = _a.collections, series = _a.series, yAxisPlacement = _a.yAxisPlacement;
    var yAxisPlacements = series
        .filter(function (s) { return s.collectionId === undefined; })
        .concat(collections)
        .reduce(function (acc, item) {
        var placement = item.yAxisPlacement || yAxisPlacement;
        if (placement) {
            acc[placement] = (acc[placement] || 0) + 1;
        }
        return acc;
    }, {});
    if (yAxisPlacements[AXIS_PLACEMENTS.BOTH]) {
        return AXIS_PLACEMENTS.BOTH;
    }
    if (yAxisPlacements[AXIS_PLACEMENTS.LEFT] &&
        yAxisPlacements[AXIS_PLACEMENTS.RIGHT]) {
        return AXIS_PLACEMENTS.BOTH;
    }
    if (yAxisPlacements[AXIS_PLACEMENTS.LEFT]) {
        return AXIS_PLACEMENTS.LEFT;
    }
    return yAxisPlacement || AXIS_PLACEMENTS.RIGHT;
};
var ScatterplotComponent = function (_a) {
    var children = _a.children, collections = _a.collections, series = _a.series, _b = _a.size, width = _b.width, height = _b.height, zoomable = _a.zoomable, onClick = _a.onClick, xAxisFormatter = _a.xAxisFormatter, xAxisPlacement = _a.xAxisPlacement, xAxisTicks = _a.xAxisTicks, yAxisFormatter = _a.yAxisFormatter, propsYAxisPlacement = _a.yAxisPlacement, yAxisTicks = _a.yAxisTicks, xAxisHeight = _a.xAxisHeight, yAxisWidth = _a.yAxisWidth;
    var chartSize = {
        width: width,
        height: height,
    };
    var collectionVisibility = collections.reduce(function (acc, c) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[c.id] = !c.hidden && c.yAxisDisplayMode !== AXIS_DISPLAY_MODES.NONE, _a)));
    }, {});
    var seriesVisibility = series.reduce(function (acc, s) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[s.id] = 
        // If it's hidden, it won't have an axis.
        !s.hidden &&
            // If it has a non-hidden axis, it will not have an axis.
            s.yAxisDisplayMode !== AXIS_DISPLAY_MODES.NONE &&
            // If it's in a collection, it gets special behavior ...
            ((s.collectionId &&
                // If it's in an unknown collection, it will have an axis.
                collectionVisibility[s.collectionId] === undefined) ||
                // And if it's not in a collection, it gets its own axis
                s.collectionId === undefined), _a)));
    }, {});
    var visibleAxes = Object.values(seriesVisibility)
        .concat(Object.values(collectionVisibility))
        .filter(Boolean).length;
    var yAxisPlacement = getYAxisPlacement$1({
        collections: collections,
        series: series,
        yAxisPlacement: propsYAxisPlacement,
    });
    chartSize.width -= visibleAxes * yAxisWidth;
    switch (xAxisPlacement) {
        case AXIS_PLACEMENTS.BOTH:
            chartSize.height -= 2 * xAxisHeight;
            break;
        default:
            chartSize.height -= xAxisHeight;
            break;
    }
    return (jsx(Layout$1, { chart: jsxs("svg", { style: { width: '100%', height: '100%' }, children: [React.Children.map(children, function (child) {
                    var _a;
                    var childProps = __assign(__assign({}, chartSize), { axes: __assign(__assign({}, (child.props || {}).axes), (_a = {}, _a[AXES.x] = ((child.props || {}).axes || {}).x === undefined
                            ? String(AXES.x)
                            : child.props.axes.x, _a)) });
                    return React.cloneElement(child, childProps);
                }), jsx(PointCollection$1, __assign({}, chartSize)), jsx(LineCollection$1, __assign({}, chartSize, { series: series.filter(function (s) { return !!s.drawLines; }), xAxis: AXES.x })), jsx(InteractionLayer$1, __assign({}, chartSize, { onClick: onClick, zoomMode: ZoomMode.BOTH, zoomAxes: { x: zoomable, y: zoomable } }))] }), yAxis: jsx(AxisCollection$1, { tickFormatter: yAxisFormatter, yAxisPlacement: yAxisPlacement, height: chartSize.height, yAxisWidth: yAxisWidth, ticks: yAxisTicks }), xAxis: jsx(XAxis$1, { width: chartSize.width, height: xAxisHeight, tickFormatter: xAxisFormatter, ticks: xAxisTicks, axis: AXES.x }), xAxisPlacement: xAxisPlacement, yAxisPlacement: yAxisPlacement }));
};
ScatterplotComponent.propTypes = propTypes$8;
ScatterplotComponent.defaultProps = defaultProps$5;
var SizedScatterplotComponent = function (_a) {
    var explicitSize = _a.size, rest = __rest(_a, ["size"]);
    var _b = useResizeDetector(), ref = _b.ref, width = _b.width, height = _b.height;
    var size = explicitSize || { width: width || 0, height: height || 0 };
    return (jsx("div", { ref: ref, style: { width: '100%', height: '100%' }, children: jsx(ScatterplotComponent, __assign({}, rest, { size: size })) }));
};
SizedScatterplotComponent.propTypes = {
    size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
};
SizedScatterplotComponent.defaultProps = {
    size: undefined,
};
var index$2 = withDisplayName('Scatterplot', function (props) { return (jsx(ScalerContext.Consumer, { children: function (_a) {
        var collections = _a.collections, series = _a.series;
        return (jsx(SizedScatterplotComponent, __assign({}, props, { collections: collections, series: series })));
    } })); });

export { AXIS_DISPLAY_MODES as AxisDisplayMode, AXIS_PLACEMENTS as AxisPlacement, Brush, Collection$1 as Collection, ContextChart$1 as ContextChart, DataProvider, index as GridLines, GriffPropTypes, Line, index$1 as LineChart, ScalerContext, index$2 as Scatterplot, Series$1 as Series, XAxis$1 as XAxis };
