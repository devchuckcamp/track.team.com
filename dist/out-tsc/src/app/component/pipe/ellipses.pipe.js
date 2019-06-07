import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var EllipsisPipe = /** @class */ (function () {
    function EllipsisPipe() {
    }
    EllipsisPipe.prototype.transform = function (val, args) {
        if (args === undefined) {
            return val;
        }
        if (val.length > args) {
            return val.substring(0, args) + '...';
        }
        else {
            return val;
        }
    };
    EllipsisPipe = tslib_1.__decorate([
        Pipe({
            name: 'ellipsis'
        })
    ], EllipsisPipe);
    return EllipsisPipe;
}());
export { EllipsisPipe };
//# sourceMappingURL=ellipses.pipe.js.map