/*
	Helper library to create standardized meta data objects for use with the "next-seo" component
*/

// import { config } from "@logdotfm/config";
// import * as profile from "~/utils/profile";

/**
 *	Create the meta data for generic public pages
 *	@param {object} data - object containing keys data for seo
 *	@returns {object} seo meta data ready for use by the "next-seo" component
 */
export function basicMeta(data) {
	// process and set defaults for the meta data
	data = {
		...data,
		title: data?.title || "Podcast app",
		description:
			data?.description ||
			data?.desc ||
			"Podcast app to follow podcasters",
		url: data?.url ? `${config?.BASE_URL}${data.url}` : null,
		image: data?.image || `${config?.BASE_URL}`,
	};

	// construct a "next-seo" compatible data object
	const seo = {
		title: data.title,
		description: data.description,
		canonical: data.url || undefined,
		openGraph: {
			url: data.title || undefined,
			title: data.title,
			description: data.description,
			images: [
				{
					url: data.image,
					alt: data.description,
					// width: 800,
					// height: 600,
				},
			],
			site_name: config.siteName,
		},
		twitter: {
			site: `@${config.twitter}`,
			cardType: "summary",
			// cardType: "summary_large_image",
		},
	};

	return seo;
}

/**
 *	Create the meta data for user/show profile pages
 *	@param {object} user - user/show profile object from the api
 *	@returns {object} seo meta data ready for use by the "next-seo" component
 */
export function profileSEO(user) {
	const url = `${config?.BASE_URL}${profile.link(user)}`;
	const description = `${profile.title(user)}'s profile on Solfate.com`;

	// construct a "next-seo" compatible data object
	const seo = {
		title: profile.title(user),
		description: user?.bio || description,
		canonical: url,
		openGraph: {
			url: url,
			title: profile.title(user),
			description: user?.bio || description,
			images: [
				{
					url: profile.image(user),
					alt: description,
					// width: 800,
					// height: 600,
				},
			],
			site_name: config.siteName,
		},
		twitter: {
			handle: user?.twitter ? `@${user?.twitter}` : undefined,
			site: `@${config.twitter}`,
			cardType: "summary",
			// cardType: "summary_large_image",
		},
	};

	return seo;
}

/**
 *	Create the meta data for public episode pages
 *	@param {object} episode - episode data object from the api
 *	@returns {object} seo meta data ready for use by the "next-seo" component
 */
export function episodeSEO(episode) {
	const user = episode.show;

	const url = `${config?.BASE_URL}${profile.linkEpisode(episode)}`;
	const description = `Listen to ${
		episode.title ? `"${episode.title}"` : "this podcast episode"
	} from ${profile.title(episode.show)} on Solfate.com.`;

	// construct a "next-seo" compatible data object
	const seo = {
		title: profile.episodeTitle(episode),
		description: episode?.summary || description,
		canonical: url,
		openGraph: {
			url: url,
			title: profile.episodeTitle(episode),
			description: episode?.summary || description,
			images: [
				{
					url: profile.episodeImage(episode),
					alt: description,
					// width: 800,
					// height: 600,
				},
			],
			site_name: config.siteName,
		},
		twitter: {
			handle: user?.twitter ? `@${user?.twitter}` : undefined,
			site: `@${config.twitter}`,
			cardType: "summary",
			// cardType: "summary_large_image",
		},
	};

	// TODO: add each of the hosts/guests of an episode as a "handle" / creator
	// idk if this is allwoed by the tiwtter card system. but if it is....

	return seo;
}
