 /** Get banners  */
    async function fetchProduktbanners() {
        try {
            const response = await fetch('/wp-json/wp/v2/produktbanners/');
            const posts = await response.json();

            let banners = [];

            for (const post of posts) {
                const postTitle = post.title.rendered;
                const postContent = post.content.rendered;

                const featuredImageId = post.featured_media;
                if (featuredImageId !== 0) {
                    const mediaResponse = await fetch(`/wp-json/wp/v2/media/${featuredImageId}`);
                    const media = await mediaResponse.json();
                    const imageUrl = media.source_url;

                    const linkProduktbanner =
                        post.acf && post.acf.link_produktbanner ? post.acf.link_produktbanner : '';

                    let banner = document.createElement('div');
                    banner.classList.add('jet-listing-grid__item', 'integerBanner');
                    banner.innerHTML = `
                        <div class="elementor-section elementor-top-section elementor-element productBanner elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div class="elementor-container elementor-column-gap-default">
                                <div class="elementor-row">
                                    <div class="elementor-column elementor-col-100 elementor-top-column elementor-element productBanner__inner">
                                        <div class="elementor-column-wrap elementor-element-populated">
                                            <div class="elementor-widget-wrap">
                                                <div class="elementor-element productBanner__title elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading"
                                                    data-element_type="widget" data-widget_type="theme-post-title.default">
                                                    <div class="elementor-widget-container">
                                                        <h1 class="elementor-heading-title elementor-size-default">${postTitle}</h1>
                                                    </div>
                                                </div>
                                                <div class="elementor-element productBanner__content elementor-widget elementor-widget-theme-post-content"
                                                    data-element_type="widget" data-widget_type="theme-post-content.default">
                                                    <div class="elementor-widget-container">${postContent}</div>
                                                </div>
                                                <div class="elementor-element productBanner__img elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image"
                                                    data-element_type="widget" data-widget_type="theme-post-featured-image.default">
                                                    <div class="elementor-widget-container">
                                                        <div class="elementor-image">
                                                            <img src="${imageUrl}" alt="${media.alt_text}" loading="lazy">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="elementor-element productBanner__btn elementor-widget elementor-widget-button"
                                                    data-element_type="widget" data-widget_type="button.default">
                                                    <div class="elementor-widget-container">
                                                        <div class="elementor-button-wrapper">
                                                            <a href="${linkProduktbanner}" class="elementor-button-link elementor-button elementor-size-sm"
                                                                role="button">
                                                                <span class="elementor-button-content-wrapper">
                                                                    <span class="elementor-button-text">Jetzt entdecken</span>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    banners.push(banner);
                }
            }

            const allProductsParent = document.querySelector('.jet-listing-grid__items');
            const allProducts = allProductsParent.querySelectorAll('.jet-listing-grid__item');

            if (allProducts.length >= 4) {
                allProductsParent.insertBefore(banners[0], allProducts[4]);

                if (allProducts.length >= 8 && banners.length >= 2) {
                    allProductsParent.insertBefore(banners[1], allProducts[7]);

                    if (allProducts.length >= 12 && banners.length >= 3) {
                        allProductsParent.insertBefore(banners[2], allProducts[12]);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchProduktbanners();
