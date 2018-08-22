Vue.component('product', {
    template: `
    <div class="container-fluid pt-5">
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-5">
                                <img :src="image" class="card-img-top" :alt="altText">
                                <div class="row">
                                    <div class="col-2" v-for="(variant, index) in variants" :key="variant.id"  @mouseover="updateProduct(index)">
                                        <div class="border rounded-circle p-3" :style="{ backgroundColor: variant.color }"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <h1 class="card-title">{{ title }}</h1>
                                <p v-if="inStock" class="card-text text-success"><small><i class="fas fa-fw fa-check-circle" ></i> In Stock</small></p>
                                <p v-else class="card-text text-danger"><small><i class="fas fa-fw fa-exclamation-circle" ></i> Out of Stock</small></p>
                                <hr>
                                <p class="card-text"><b>Details</b></p>
                                <ul>
                                    <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
                                </ul>
                                <br>
                                <p><button class="btn btn-primary btn-block" @click="addToCart" :disabled="!inStock" >Add to Cart</button></p>
                                <hr>
                                <p>
                                    Shipping: <b>{{ shipping }}</b>
                                    <small v-show="premium" class="text-success float-right">
                                        <i class="fas fa-fw fa-check-circle"></i> Premium Account
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <h3><b>Reviews</b></h3>
                <p v-if="!reviews.length">No Reviews Yet</p>
                <dl v-for="review in reviews">
                    <dt>Rating: {{ review.rating }}</dt>
                    <dd class="text-muted">{{ review.review }}</dd>
                </dl>
            </div>
            <div class="col">
                <product-review @review-submitted="addReview"></product-review>
            </div>
        </div>
    </div>
    `,

    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            product: 'Socks',
            brand: 'Acme Inc.',
            altText: 'A pair of socks',
            details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
            variants: [
                {
                    id: 2234,
                    color: 'green',
                    image: './assets/img/green-sock.png',
                    quantity: 10
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: './assets/img/blue-sock.png',
                    quantity: 0
                }
            ],
            selectedVariant: 0,
            reviews: []
        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },

        updateProduct(index) {
            this.selectedVariant = index;
        },

        addReview(productReview) {
            this.reviews.push(productReview);
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].image
        },

        inStock() {
            return this.variants[this.selectedVariant].quantity
        },

        shipping() {
            if (this.premium) {
                return 'Free';
            } else {
                return 2.99;
            }
        }
    }    
});

Vue.component('product-review', {
    template: `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title text-center"><b>Review</b></h3>
                <hr>
                <div v-if="errors.length">
                    <p class="text-danger">Please correct the following:</p>
                    <ol>
                        <li v-for="error in errors"><span class="text-danger">{{ error }}</span></li>
                    </ol>
                </div>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" class="form-control" v-model="name" placeholder="e.g. Jane Doe">
                    </div>
                    <div class="form-group">
                        <label for="review">Review</label>
                        <textarea id="review" class="form-control" v-model="review" rows="3" placeholder="e.g. Awesome/Buggy Product!"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="rating">Rating</label>
                        <select id="rating" class="form-control" v-model.number="rating">
                            <option>5 Stars</option>
                            <option>4 Stars</option>
                            <option>3 Stars</option>
                            <option>2 Stars</option>
                            <option>1 Star</option>
                        </select>
                    </div>
                    <hr>
                    <button type="submit" class="btn btn-primary btn-block">Submit Review</button>
                </form>
            </div>
        </div>
    `,

    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },

    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: Number(this.rating)
                }
    
                this.$emit('review-submitted', productReview);
    
                this.errors = [];

                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                this.errors = [];

                if (!this.name) {
                    this.errors.push('Name Required');
                }
                
                if (!this.review) {
                    this.errors.push('Review Required');
                }
                
                if (!Number(this.rating)) {
                    this.errors.push('Rating Required');
                }
            }
        }
    }
});

var app = new Vue({
    el: '#app',

    data: {
        premium: true,
        cart: []
    },

    methods: {
        updateCart(productId) {
            this.cart.push(productId);
        }
    }
});