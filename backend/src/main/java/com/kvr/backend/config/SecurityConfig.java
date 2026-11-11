package com.kvr.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            // =====================================================
            // CSRF
            // =====================================================
            // This backend exposes REST APIs.
            // CSRF is disabled so public POST requests such as
            // POST /api/admissions can be submitted by React/curl.
            // =====================================================

            .csrf(csrf -> csrf.disable())


            // =====================================================
            // CORS
            // =====================================================

            .cors(cors -> {
            })


            // =====================================================
            // SESSION
            // =====================================================

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.IF_REQUIRED
                )
            )


            // =====================================================
            // AUTHORIZATION
            // =====================================================

            .authorizeHttpRequests(auth -> auth

                // -------------------------------------------------
                // OPTIONS / CORS PREFLIGHT
                // -------------------------------------------------

                .requestMatchers(
                    HttpMethod.OPTIONS,
                    "/**"
                ).permitAll()


                // -------------------------------------------------
                // ADMISSION API
                // -------------------------------------------------
                // Explicitly permit ALL HTTP methods used by the
                // admission module.
                // -------------------------------------------------

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/admissions"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/admissions",
                    "/api/admissions/**"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/admissions/**"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/admissions/**"
                ).permitAll()

                .requestMatchers(
                    "/api/admissions",
                    "/api/admissions/**"
                ).permitAll()

// -------------------------------------------------
// ACTUATOR HEALTH CHECK
// -------------------------------------------------

.requestMatchers("/actuator/health").permitAll()

                // -------------------------------------------------
                // OTHER PUBLIC APIs
                // -------------------------------------------------

                .requestMatchers(
                    "/api/auth/**",
                    "/api/student/auth/**",
                    "/api/classes/**",
                    "/api/teachers/**",
                    "/api/attendance/**",
                    "/api/fees/**",
                    "/api/students/**"
                ).permitAll()


                // -------------------------------------------------
                // EVERYTHING ELSE
                // -------------------------------------------------

                .anyRequest().authenticated()
            )


            // =====================================================
            // DISABLE DEFAULT LOGIN
            // =====================================================

            .formLogin(form -> form.disable())

            .httpBasic(basic -> basic.disable());


        return http.build();
    }
}
