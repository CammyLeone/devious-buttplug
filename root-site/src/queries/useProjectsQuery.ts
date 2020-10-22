import { graphql, useStaticQuery } from 'gatsby';
import { Project } from '../types';

export type QueryResponse = {
  contentfulAbout: {
    projects: {
      id: string;
      name: string;
      slug: string;
      description: string;
      extendedDescription: {
        childMarkdownRemark: {
          rawMarkdownBody: string;
        };
      };
      screenshots: {
        title: string;
        image: {
          src: string;
        };
      }[];
      homepage: string;
      repository: string;
      publishedDate: string;
      type: string;
      logo: {
        title: string;
        image: {
          src: string;
        };
      };
    }[];
  };
};

export const useProjectsQuery = (): Project[] => {
  const { contentfulAbout } = useStaticQuery<QueryResponse>(graphql`
    query ProjectsQuery {
      contentfulAbout {
        projects {
          id
          name
          slug
          description
          extendedDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          screenshots {
            title
            image: resize(width: 1280, quality: 100) {
              src
            }
          }
          homepage: projectUrl
          repository: repositoryUrl
          publishedDate(formatString: "YYYY")
          type
          logo {
            title
            image: resize(width: 200, quality: 100) {
              src
            }
          }
        }
      }
    }
  `);

  return contentfulAbout.projects.map(
    ({ extendedDescription, screenshots, logo, ...rest }) => {
      return {
        ...rest,
        extendedDescription:
          extendedDescription.childMarkdownRemark.rawMarkdownBody,
        screenshots: screenshots
          ? screenshots.map(({ title, image: { src } }) => ({
              alt: title,
              src,
            }))
          : [],
        logo: {
          alt: logo.title,
          src: logo.image.src,
        },
      };
    },
  );
};
