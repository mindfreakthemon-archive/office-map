// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/cc3d223a946f661eff871787edeb0fcb8f0db156/cookie-parser/cookie-parser.d.ts
// Type definitions for cookie-parser v1.3.4
// Project: https://github.com/expressjs/cookie-parser
// Definitions by: Santi Albo <https://github.com/santialbo/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare module "cookie-parser" {
    import express = require('express');
    function e(secret?: string, options?: any): express.RequestHandler;
    namespace e{}
    export = e;
}