package com.example.server.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.server.security.jwt.AuthEntryPointJwt;
import com.example.server.security.jwt.AuthTokenFilter;
import com.example.server.security.services.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/delivery-orders").permitAll()
            .requestMatchers("/api/delivery-orders/**").permitAll()
            .requestMatchers("/api/transaction-points").permitAll()
            .requestMatchers("/api/transaction-points/**").permitAll()
            .requestMatchers("/api/gathering-points").permitAll()
            .requestMatchers("/api/gathering-points/**").permitAll()
            .requestMatchers("/api/test/**").permitAll()
            .requestMatchers("/api/point-leaders").permitAll()
            .requestMatchers("/api/point-leaders/**").permitAll()
            .requestMatchers("/api/users/**").permitAll()
            .requestMatchers("/api/teller/**").permitAll()
            .requestMatchers("/api/teller").permitAll()
            .requestMatchers("/api/order-movements").permitAll()
            .requestMatchers("/api/order-movements/**").permitAll()
            .requestMatchers("/api/transaction-gathering").permitAll()
            .requestMatchers("/api/staff").permitAll()
            .requestMatchers("/api/customer").permitAll()
            .requestMatchers("/api/customer/**").permitAll()
            .anyRequest().authenticated());

    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
