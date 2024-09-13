// Vue Keep-Alive 实现

class KeepAlive {
    constructor() {
        this.cache = new Map();
        this.keys = [];
    }

    render(h, { children, props }) {
        const vnode = children[0];
        if (vnode && vnode.componentOptions) {
            const { componentOptions: { Ctor, propsData, tag } } = vnode;
            const key = vnode.key == null ? tag : vnode.key;
            const { include, exclude, max } = props;

            // 检查组件是否应该被缓存
            if (
                (include && (!key || !include.test(key))) ||
                (exclude && key && exclude.test(key))
            ) {
                return vnode;
            }

            const componentInstance = vnode.componentInstance;
            const cacheKey = `${Ctor.cid}::${key}`;

            if (this.cache.has(cacheKey)) {
                vnode.componentInstance = this.cache.get(cacheKey).componentInstance;
                // 将key移到数组末尾，表示最近使用
                this.keys.splice(this.keys.indexOf(cacheKey), 1);
                this.keys.push(cacheKey);
            } else {
                this.cache.set(cacheKey, vnode);
                this.keys.push(cacheKey);
                // 如果缓存超过最大值，删除最久未使用的组件
                if (max && this.keys.length > parseInt(max)) {
                    this.pruneCacheEntry(this.keys[0]);
                }
            }

            vnode.data.keepAlive = true;
        }
        return vnode;
    }

    pruneCacheEntry(key) {
        const cached = this.cache.get(key);
        const instance = cached.componentInstance;
        if (instance && instance.$destroy) {
            instance.$destroy();
        }
        this.cache.delete(key);
        this.keys.splice(this.keys.indexOf(key), 1);
    }
}

// 使用示例
// <keep-alive :include="includeRegex" :exclude="excludeRegex" :max="10">
//   <component :is="currentComponent"></component>
// </keep-alive>

// 注册 KeepAlive 组件
// Vue.component('keep-alive', {
//     abstract: true,
//     props: {
//         include: RegExp,
//         exclude: RegExp,
//         max: [String, Number]
//     },
//     created() {
//         this.cache = new Map();
//         this.keys = [];
//     },
//     destroyed() {
//         for (const key of this.keys) {
//             this.pruneCacheEntry(key);
//         }
//     },
//     render() {
//         const slot = this.$slots.default;
//         const vnode = getFirstComponentChild(slot);
//         const componentOptions = vnode && vnode.componentOptions;
//         if (componentOptions) {
//             const name = getComponentName(componentOptions);
//             const { include, exclude } = this;
//             if (
//                 (include && (!name || !matches(include, name))) ||
//                 (exclude && name && matches(exclude, name))
//             ) {
//                 return vnode;
//             }

//             const { cache, keys } = this;
//             const key = vnode.key == null
//                 ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
//                 : vnode.key;
//             if (cache[key]) {
//                 vnode.componentInstance = cache[key].componentInstance;
//                 remove(keys, key);
//                 keys.push(key);
//             } else {
//                 cache[key] = vnode;
//                 keys.push(key);
//                 if (this.max && keys.length > parseInt(this.max)) {
//                     pruneCacheEntry(cache, keys[0], keys, this._vnode);
//                 }
//             }

//             vnode.data.keepAlive = true;
//         }
//         return vnode || (slot && slot[0]);
//     }
// });
