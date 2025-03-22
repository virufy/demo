"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var use_ssr_1 = __importDefault(require("use-ssr"));
exports.errorMessage1 = 'You must either add a `ref` to the element you are interacting with or pass an `event` to openPortal(e) or togglePortal(e).';
function usePortal(_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.closeOnOutsideClick, closeOnOutsideClick = _b === void 0 ? true : _b, _c = _a.closeOnEsc, closeOnEsc = _c === void 0 ? true : _c, bindTo = _a.bindTo, // attach the portal to this node in the DOM
    _d = _a.isOpen, // attach the portal to this node in the DOM
    defaultIsOpen = _d === void 0 ? false : _d, onOpen = _a.onOpen, onClose = _a.onClose, onPortalClick = _a.onPortalClick, eventHandlers = __rest(_a, ["closeOnOutsideClick", "closeOnEsc", "bindTo", "isOpen", "onOpen", "onClose", "onPortalClick"]);
    var _e = use_ssr_1.default(), isServer = _e.isServer, isBrowser = _e.isBrowser;
    var _f = react_1.useState(defaultIsOpen), isOpen = _f[0], makeOpen = _f[1];
    // we use this ref because `isOpen` is stale for handleOutsideMouseClick
    var open = react_1.useRef(isOpen);
    var setOpen = react_1.useCallback(function (v) {
        // workaround to not have stale `isOpen` in the handleOutsideMouseClick
        open.current = v;
        makeOpen(v);
    }, []);
    var targetEl = react_1.useRef(); // this is the element you are clicking/hovering/whatever, to trigger opening the portal
    var portal = react_1.useRef(isBrowser ? document.createElement('div') : null);
    react_1.useEffect(function () {
        if (isBrowser && !portal.current)
            portal.current = document.createElement('div');
    }, [isBrowser, portal]);
    var elToMountTo = react_1.useMemo(function () {
        if (isServer)
            return;
        return (bindTo && react_dom_1.findDOMNode(bindTo)) || document.body;
    }, [isServer, bindTo]);
    var createCustomEvent = function (e) {
        if (!e)
            return { portal: portal, targetEl: targetEl, event: e };
        var event = e || {};
        if (event.persist)
            event.persist();
        event.portal = portal;
        event.targetEl = targetEl;
        event.event = e;
        var currentTarget = e.currentTarget;
        if (!targetEl.current && currentTarget && currentTarget !== document)
            targetEl.current = event.currentTarget;
        return event;
    };
    // this should handle all eventHandlers like onClick, onMouseOver, etc. passed into the config
    var customEventHandlers = Object
        .entries(eventHandlers)
        .reduce(function (acc, _a) {
        var handlerName = _a[0], eventHandler = _a[1];
        acc[handlerName] = function (event) {
            if (isServer)
                return;
            eventHandler(createCustomEvent(event));
        };
        return acc;
    }, {});
    var openPortal = react_1.useCallback(function (e) {
        if (isServer)
            return;
        var customEvent = createCustomEvent(e);
        // for some reason, when we don't have the event argument, there
        // is a weird race condition. Would like to see if we can remove
        // setTimeout, but for now this works
        if (targetEl.current == null) {
            setTimeout(function () { return setOpen(true); }, 0);
            throw Error(exports.errorMessage1);
        }
        if (onOpen)
            onOpen(customEvent);
        setOpen(true);
    }, [isServer, portal, setOpen, targetEl, onOpen]);
    var closePortal = react_1.useCallback(function (e) {
        if (isServer)
            return;
        var customEvent = createCustomEvent(e);
        if (onClose && open.current)
            onClose(customEvent);
        if (open.current)
            setOpen(false);
    }, [isServer, onClose, setOpen]);
    var togglePortal = react_1.useCallback(function (e) {
        return open.current ? closePortal(e) : openPortal(e);
    }, [closePortal, openPortal]);
    var handleKeydown = react_1.useCallback(function (e) {
        return (e.key === 'Escape' && closeOnEsc) ? closePortal(e) : undefined;
    }, [closeOnEsc, closePortal]);
    var handleOutsideMouseClick = react_1.useCallback(function (e) {
        var containsTarget = function (target) { return target.current.contains(e.target); };
        if (containsTarget(portal) || e.button !== 0 || !open.current || containsTarget(targetEl))
            return;
        if (closeOnOutsideClick)
            closePortal(e);
    }, [isServer, closePortal, closeOnOutsideClick, portal]);
    var handleMouseDown = react_1.useCallback(function (e) {
        if (isServer || !(portal.current instanceof HTMLElement))
            return;
        var customEvent = createCustomEvent(e);
        if (portal.current.contains(customEvent.target) && onPortalClick)
            onPortalClick(customEvent);
        handleOutsideMouseClick(e);
    }, [handleOutsideMouseClick]);
    // used to remove the event listeners on unmount
    var eventListeners = react_1.useRef({});
    react_1.useEffect(function () {
        if (isServer)
            return;
        if (!(elToMountTo instanceof HTMLElement) || !(portal.current instanceof HTMLElement))
            return;
        // TODO: eventually will need to figure out a better solution for this.
        // Surely we can find a way to map onScroll/onWheel -> scroll/wheel better,
        // but for all other event handlers. For now this works.
        var eventHandlerMap = {
            onScroll: 'scroll',
            onWheel: 'wheel',
        };
        var node = portal.current;
        elToMountTo.appendChild(portal.current);
        // handles all special case handlers. Currently only onScroll and onWheel
        Object.entries(eventHandlerMap).forEach(function (_a) {
            var handlerName = _a[0] /* onScroll */, eventListenerName = _a[1] /* scroll */;
            if (!eventHandlers[handlerName])
                return;
            eventListeners.current[handlerName] = function (e) { return eventHandlers[handlerName](createCustomEvent(e)); };
            document.addEventListener(eventListenerName, eventListeners.current[handlerName]);
        });
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('mousedown', handleMouseDown);
        return function () {
            // handles all special case handlers. Currently only onScroll and onWheel
            Object.entries(eventHandlerMap).forEach(function (_a) {
                var handlerName = _a[0], eventListenerName = _a[1];
                if (!eventHandlers[handlerName])
                    return;
                document.removeEventListener(eventListenerName, eventListeners.current[handlerName]);
                delete eventListeners.current[handlerName];
            });
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('mousedown', handleMouseDown);
            elToMountTo.removeChild(node);
        };
    }, [isServer, handleOutsideMouseClick, handleKeydown, elToMountTo, portal]);
    var Portal = react_1.useCallback(function (_a) {
        var children = _a.children;
        if (portal.current != null)
            return react_dom_1.createPortal(children, portal.current);
        return null;
    }, [portal]);
    return Object.assign([openPortal, closePortal, open.current, Portal, togglePortal, targetEl, portal], __assign(__assign({ isOpen: open.current, openPortal: openPortal, ref: targetEl, closePortal: closePortal,
        togglePortal: togglePortal,
        Portal: Portal, portalRef: portal }, customEventHandlers), { bind: __assign({ ref: targetEl }, customEventHandlers) }));
}
exports.default = usePortal;
//# sourceMappingURL=usePortal.js.map