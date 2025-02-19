import {tuiDefaultProp, tuiPure} from '@taiga-ui/cdk/decorators';

describe(`@tuiDefaultProp and @tuiPure`, () => {
    it(`Support redefine properties for parent class`, () => {
        class C {
            @tuiDefaultProp()
            limitWidth = `__C`;

            constructor(limitWidth: string) {
                this.limitWidth = limitWidth;
            }

            @tuiPure
            get width(): string {
                return this.limitWidth;
            }
        }

        class B extends C {
            @tuiDefaultProp()
            override limitWidth = `__B`;

            @tuiPure
            update(val: string): this {
                super.limitWidth = val; // the target is super(parent) class

                return this;
            }

            @tuiPure
            override get width(): string {
                return super.width; // the target is super(parent) class
            }
        }

        class A extends B {
            @tuiPure
            override get width(): string {
                return super.width; // the target is super(parent) class
            }

            @tuiPure
            override update(val: string): this {
                super.update(val); // the target is super(parent) class

                return this;
            }
        }

        expect(new A(`_A_`).limitWidth).toBe(`__B`);
        expect(new B(`_B_`).limitWidth).toBe(`__B`);
        expect(new C(`_C_`).limitWidth).toBe(`_C_`);

        expect(new A(`_A_`).update(`A`).width).toBe(`A`);
        expect(new B(`_B_`).update(`B`).width).toBe(`B`);
        expect(new C(`_C_`).width).toBe(`_C_`);
    });
});
