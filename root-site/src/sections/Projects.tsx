import React from 'react';
import { Box, Image, Flex } from 'rebass/styled-components';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Fade } from 'react-awesome-reveal';
import Section from '../components/Section';
import Triangle from '../components/Triangle';
import markdownRenderer from '../components/MarkdownRenderer';
import { useProjectsQuery } from '../queries/useProjectsQuery';

const Projects = () => {
  const projects = useProjectsQuery();

  return (
    <div>
      {projects.map((project, idx) => {
        return (
          <Section.Container id={project.name} Background={Background}>
            <Section.Header name={project.name} />
            <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
              <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]} mt={2}>
                <Fade direction="down" triggerOnce>
                  <ReactMarkdown
                    source={project.extendedDescription}
                    renderers={markdownRenderer}
                  />
                </Fade>
              </Box>

              {project.screenshots[0] && (
                <Box
                  width={[1, 1, 2 / 6]}
                  style={{ maxWidth: '300px', margin: 'auto' }}
                >
                  <Fade direction="right" triggerOnce>
                    <ProfilePicture
                      mt={[4, 4, 0]}
                      ml={[0, 0, 1]}
                      {...project.screenshots[0]}
                    />
                  </Fade>
                </Box>
              )}
            </Flex>
          </Section.Container>
        );
      })}
    </div>
  );
};

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.4s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const Background = () => (
  <>
    <Triangle
      color="secondary"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      position="bottom-left"
    />

    <Triangle
      color="primary"
      height={['20vh', '40vh']}
      width={['75vw', '70vw']}
      position="top-right"
    />

    <Triangle
      color="muted"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
    />
  </>
);

export default Projects;
