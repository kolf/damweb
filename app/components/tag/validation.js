import memoize from "lru-memoize";
import {createValidator, required, maxLength, zhEn, enNumber} from "app/utils/validation";

const validation = createValidator({
	"cnname": required,
	"enname": required,
	"kind"  : required
});

export default memoize(10)(validation);